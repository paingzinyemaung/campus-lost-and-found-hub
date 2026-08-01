import { prisma } from '../../lib/prisma.js';
import type { Response } from 'express';
import type { AuthRequest } from '../../middleware/auth.middleware.js';

// ၁. ပစ္စည်းအသစ် တင်ခြင်း (Lost & Found Post Create)
export const createItem = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, category, location, contactInfo, status } =
      req.body;
    const userId = req.user?.id;

    // ပုံဖိုင် ပါလာလျှင် URL တည်ဆောက်ခြင်း
    let imageUrl = null;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const newItem = await prisma.item.create({
      data: {
        title,
        description,
        category,
        location,
        contactInfo,
        status: status || 'LOST',
        imageUrl, // တည်ဆောက်ထားသော URL (သို့) null ဝင်သွားမည်
        userId: userId!,
      },
    });

    return res.status(201).json({
      ok: true,
      message: 'ပစ္စည်းအချက်အလက်နှင့် ပုံကို အောင်မြင်စွာ တင်ပြီးပါပြီ။',
      data: newItem,
    });
  } catch (error) {
    console.error('Create Item Error:', error);
    return res.status(500).json({
      ok: false,
      message: 'ဆာဗာတွင် အမှားယွင်းတချို့ ရှိသွားပါသည်။',
    });
  }
};

// ၂. တင်ထားသော ပစ္စည်းများအားလုံးကို ရယူခြင်း (Get All Items)
export const getItems = async (req: AuthRequest, res: Response) => {
  try {
    const items = await prisma.item.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            studentId: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // အသစ်ဆုံးကို အပေါ်ဆုံးမှ ပြရန်
      },
    });

    return res.status(200).json({
      ok: true,
      data: items,
    });
  } catch (error) {
    console.error('Get Items Error:', error);
    return res.status(500).json({
      ok: false,
      message: 'ဆာဗာတွင် အမှားယွင်းတချို့ ရှိသွားပါသည်။',
    });
  }
};

// ၃. ID ဖြင့် ပစ္စည်းတစ်ခုချင်းစီ၏ အသေးစိတ်ကို ရယူခြင်း (Get Item By ID)
export const getItemById = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string; // URL ထဲမှ id ကို ယူခြင်း

    const item = await prisma.item.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            studentId: true,
          },
        },
      },
    });

    if (!item) {
      return res.status(404).json({
        ok: false,
        message: 'ရှာဖွေနေသော ပစ္စည်းကို မတွေ့ရှိပါ။',
      });
    }

    return res.status(200).json({
      ok: true,
      data: item,
    });
  } catch (error) {
    console.error('Get Item By ID Error:', error);
    return res.status(500).json({
      ok: false,
      message: 'ဆာဗာတွင် အမှားယွင်းတချို့ ရှိသွားပါသည်။',
    });
  }
};

// ၄. ကိုယ်တင်ထားသော ပစ္စည်းပို့စ်ကို ပြန်လည်ဖျက်ခြင်း (Delete Item)
export const deleteItem = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = req.user?.id; // protect middleware မှ ပါလာသော လက်ရှိ user id

    // ၁. ဖျက်မည့် ပစ္စည်း ရှိမရှိ စစ်ဆေးခြင်း
    const item = await prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      return res.status(404).json({
        ok: false,
        message: 'ဖျက်ရန် ရှာမတွေ့သော ပစ္စည်း (သို့) ပို့စ် မရှိပါ။',
      });
    }

    // ၂. မိမိတင်ထားသော ပစ္စည်း ဟုတ်မဟုတ် စစ်ဆေးခြင်း (Authorization)
    if (item.userId !== userId) {
      return res.status(403).json({
        ok: false,
        message: 'ဤပစ္စည်းပို့စ်ကို ဖျက်ရန် ခွင့်ပြုချက်မရှိပါ။',
      });
    }

    // ၃. ပစ္စည်းကို ဖျက်ဆီးခြင်း
    await prisma.item.delete({
      where: { id },
    });

    return res.status(200).json({
      ok: true,
      message: 'ပစ္စည်းပို့စ်ကို အောင်မြင်စွာ ဖျက်ပြီးပါပြီ။',
    });
  } catch (error) {
    console.error('Delete Item Error:', error);
    return res.status(500).json({
      ok: false,
      message: 'ဆာဗာတွင် အမှားယွင်းတချို့ ရှိသွားပါသည်။',
    });
  }
};

// ၅. တင်ထားသော ပစ္စည်းအချက်အလက်ကို ပြင်ဆင်ခြင်း (Update Item)
export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = req.user?.id;
    const {
      title,
      description,
      category,
      location,
      contactInfo,
      status,
      imageUrl,
    } = req.body;

    // ၁. ပြင်ဆင်မည့် ပစ္စည်း ရှိမရှိ စစ်ဆေးခြင်း
    const existingItem = await prisma.item.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return res.status(404).json({
        ok: false,
        message: 'ပြင်ဆင်ရန် ရှာမတွေ့သော ပစ္စည်း (သို့) ပို့စ် မရှိပါ။',
      });
    }

    // ၂. မိမိတင်ထားသော ပစ္စည်း ဟုတ်မဟုတ် စစ်ဆေးခြင်း (Authorization)
    if (existingItem.userId !== userId) {
      return res.status(403).json({
        ok: false,
        message: 'ဤပစ္စည်းပို့စ်ကို ပြင်ဆင်ရန် ခွင့်ပြုချက်မရှိပါ။',
      });
    }

    // ၃. ပစ္စည်းအချက်အလက်များကို Update လုပ်ခြင်း
    const updatedItem = await prisma.item.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existingItem.title,
        description:
          description !== undefined ? description : existingItem.description,
        category: category !== undefined ? category : existingItem.category,
        location: location !== undefined ? location : existingItem.location,
        contactInfo:
          contactInfo !== undefined ? contactInfo : existingItem.contactInfo,
        status: status !== undefined ? status : existingItem.status,
        imageUrl: imageUrl !== undefined ? imageUrl : existingItem.imageUrl,
      },
    });

    return res.status(200).json({
      ok: true,
      message: 'ပစ္စည်းအချက်အလက်ကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ။',
      data: updatedItem,
    });
  } catch (error) {
    console.error('Update Item Error:', error);
    return res.status(500).json({
      ok: false,
      message: 'ဆာဗာတွင် အမှားယွင်းတချို့ ရှိသွားပါသည်။',
    });
  }
};
