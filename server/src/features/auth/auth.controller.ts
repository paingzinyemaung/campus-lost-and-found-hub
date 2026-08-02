import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma.js'; // ကိုယ့် prisma client တည်နေရာအပေါ်မူတည်၍ ပြင်ရန်
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const register = async (
  req: Request<
    {},
    {},
    { name: string; email: string; studentId: string; password: string }
  >,
  res: Response,
) => {
  try {
    const { name, email, studentId, password } = req.body;

    // ၁. လိုအပ်သော Field များ ပြည့်စုံမှု ရှိမရှိ စစ်ဆေးခြင်း
    if (!name || !email || !studentId || !password) {
      return res.status(400).json({
        ok: false,
        message: 'အချက်အလက်များကို အကုန်ဖြည့်စွက်ပေးပါ။',
      });
    }

    // ၂. Campus Email Validation (ကျောင်း mail သို့မဟုတ် .edu.mm ဖြစ်ရမည်)
    if (!email.endsWith('.edu.mm')) {
      return res.status(400).json({
        ok: false,
        message:
          'ကျေးဇူးပြု၍ တက္ကသိုလ်ကျောင်း Email (.edu.mm) ဖြင့်သာ Register လုပ်ပါ။',
      });
    }

    // ၃. Email သို့မဟုတ် Student ID ရှိပြီးသား ဖြစ်မဖြစ် စစ်ဆေးခြင်း
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { studentId }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        ok: false,
        message:
          'ဤ Email သို့မဟုတ် ကျောင်းသား ID ဖြင့် အကောင့်ဖွင့်ပြီးသား ဖြစ်ပါသည်။',
      });
    }

    // ၄. Password ကို Hashing လုပ်ခြင်း
    const hashedPassword = await bcrypt.hash(password, 10);

    // ၅. Database ထဲသို့ User အသစ် ထည့်သွင်းခြင်း
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        studentId,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        studentId: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      message: 'အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်။',
      user: newUser,
    });
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({
      ok: false,
      message: 'ဆာဗာတွင် အမှားယွင်းတချို့ ရှိသွားပါသည်။',
    });
  }
};

export const login = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    // ၁. Field များ ပြည့်စုံမှု ရှိမရှိ စစ်ဆေးခြင်း
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: 'ကျေးဇူးပြု၍ Email နှင့် Password ကို ဖြည့်စွက်ပေးပါ။',
      });
    }

    // ၂. Database ထဲတွင် User ရှိမရှိ ရှာဖွေခြင်း
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'ဤ Email ဖြင့် အကောင့်ရှိမနေပါ။',
      });
    }

    // ၃. Password တိုက်ဆိုင်စစ်ဆေးခြင်း
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        ok: false,
        message: 'Password မှားယွင်းနေပါသည်။',
      });
    }

    // ၄. JWT Token ဖန်တီးခြင်း
    // Payload အနေဖြင့် id, email နှင့် studentId ကို ထည့်သွင်းထားသည် (role မပါသေးပါက ဖယ်ထားနိုင်သည်)
    const token = jwt.sign(
      { id: user.id, email: user.email, studentId: user.studentId },
      process.env.JWT_SECRET as string, // .env ဖိုင်ထဲတွင် JWT_SECRET ရှိရန်လိုအပ်သည်
      { expiresIn: '1d' },
    );

    // ၅. Cookie အတွင်းသို့ Token ကို သိမ်းဆည်းပေးပို့ခြင်း
    res.cookie('token', token, {
      httpOnly: true, // XSS Attack များမှ ကာကွယ်ရန် (Client ဘက်မှ JS ဖြင့် ဖတ်၍မရစေရန်)
      secure: process.env.NODE_ENV === 'production', // Production တွင် HTTPS ဖြင့်သာ အလုပ်လုပ်စေရန်
      sameSite: 'strict', // CSRF Attack များမှ ကာကွယ်ရန်
      maxAge: 24 * 60 * 60 * 1000, // ၁ ရက် (1 day in milliseconds)
    });

    // Client ဘက်သို့ Password မပါသော အချက်အလက်များသာ ပြန်ပို့ရန်
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      ok: true,
      message: 'အကောင့်ဝင်ရောက်ခြင်း အောင်မြင်ပါသည်။',
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      ok: false,
      message: 'ဆာဗာတွင် အမှားယွင်းတချို့ ရှိသွားပါသည်။',
    });
  }
};

export const checkMe = async (req: Request, res: Response) => {
  const clientCookies = req.cookies;

  if (!clientCookies.token) {
    return res.status(401).json({
      ok: false,
      message: 'Unauthorized',
    });
  }

  try {
    // ၁။ Token ကို verify လုပ်ပြီး payload ကို ယူပါမည်
    const decoded = jwt.verify(
      clientCookies.token,
      process.env.JWT_SECRET!,
    ) as any;

    // ၂။ Token ထဲမှ ID ဖြင့် Database တွင် User ကို ရှာပါမည်
    // (မှတ်ချက် - login လုပ်စဥ်က token payload ထဲသို့ ထည့်ပေးလိုက်သော key အမည်ပေါ်မူတည်၍ decoded.id သို့မဟုတ် decoded.userId ဖြစ်နိုင်ပါသည်)
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        // လုံခြုံရေးအရ Password ကို ဖယ်ချန်ထားခဲ့ပါ
      },
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'User not found',
      });
    }

    // ၃။ User အချက်အလက်ကို Frontend သို့ ပြန်ပို့ပေးပါမည်
    return res.status(200).json({
      ok: true,
      message: 'User is valid',
      user: user, // 👈 Frontend က လိုချင်နေတဲ့ Data ပါ
    });
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token!',
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Cookie ကို ရှင်းလင်းခြင်း (Login ဝင်တုန်းက သုံးခဲ့တဲ့ cookie options တွေနဲ့ အတူတူ ပေးရပါတယ်)
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Local (http) မှာဆိုရင် false ဖြစ်သွားပါမယ်
      sameSite: 'strict',
    });

    return res
      .status(200)
      .json({ message: 'အောင်မြင်စွာ Logout ထွက်ပြီးပါပြီ' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
