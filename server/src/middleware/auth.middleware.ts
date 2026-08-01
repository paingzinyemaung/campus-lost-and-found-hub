import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Request ထဲသို့ userId ကို Custom ထည့်သုံးရန် Interface ချဲ့ထွင်ခြင်း
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    studentId: string;
  };
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: 'ခွင့်ပြုချက်မရှိပါ (Login ဝင်ရန် လိုအပ်သည်)။',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      studentId: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'Token မမှန်ကန်ပါ သို့မဟုတ် သက်တမ်းကုန်သွားပါပြီ။',
    });
  }
};
