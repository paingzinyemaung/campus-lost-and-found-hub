import 'dotenv/config';
import type { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Vercel ရဲ့ request body limit (4.5MB) အောက်မှာ ထားရန်
const MAX_IMAGE_MB = 4;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'campus-lost-and-found',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  } as any,
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Image files only.'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_IMAGE_MB * 1024 * 1024,
  },
});

// upload.single('image') အစား ဒါကို သုံးရင် error တွေကို JSON နဲ့ ပြန်ပေးမယ်
export const uploadImage = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  upload.single('image')(req, res, (err: unknown) => {
    if (!err) return next();

    console.error('Image upload error:', err);

    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          ok: false,
          message: `ပုံအရွယ်အစား ${MAX_IMAGE_MB}MB ထက် မကျော်ရပါ။`,
        });
      }
      return res
        .status(400)
        .json({ ok: false, message: 'ပုံတင်ရာတွင် အမှားအယွင်း ရှိသွားပါသည်။' });
    }

    if (err instanceof Error && err.message === 'Image files only.') {
      return res
        .status(400)
        .json({ ok: false, message: 'ပုံဖိုင်သာ တင်ခွင့်ပြုပါသည်။' });
    }

    // Cloudinary ဘက်ကပြဿနာ (key မှား/မရှိ၊ network စသည်)
    return res.status(500).json({
      ok: false,
      message:
        'ပုံကို သိမ်းဆည်းရာတွင် အမှားအယွင်း ရှိသွားပါသည်။ ခဏနေမှ ထပ်ကြိုးစားပါ။',
    });
  });
};

export { cloudinary };
