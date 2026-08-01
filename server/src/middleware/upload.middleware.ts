import multer from 'multer';
import path from 'path';

// ပုံသိမ်းမည့် နေရာနှင့် နာမည်သတ်မှတ်ခြင်း
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Project root မှာ 'uploads' folder ရှိရပါမယ်
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// ပုံဖိုင် ဟုတ်မဟုတ် စစ်ဆေးခြင်း
const fileFilter = (req: any, file: Express.Multer.File, cb: Function) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('ပုံဖိုင် (Image) သာ တင်ခွင့်ရှိပါသည်။'), false);
  }
};

export const upload = multer({ storage, fileFilter });
