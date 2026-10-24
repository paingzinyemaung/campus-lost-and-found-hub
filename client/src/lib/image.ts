// Cloudinary ပုံကို လိုသလောက်သာ ဆွဲဖို့ (အရွယ်အစားနဲ့ format အလိုအလျောက်)

// Cloudinary ပုံကို လိုသလောက်သာ ဆွဲဖို့
export const optimizeImage = (url: string, width = 600) =>
  url.includes('res.cloudinary.com') && url.includes('/upload/')
    ? url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`)
    : url;

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image load failed'));
    };
    img.src = url;
  });

// ဖုန်းဓာတ်ပုံကို upload မတင်ခင် ဖုန်းထဲမှာ သေးအောင် လုပ်ပေးခြင်း
export async function compressImage(
  file: File,
  maxSize = 1600,
  quality = 0.8,
): Promise<File> {
  // JPG/PNG/WebP မဟုတ်ရင် (GIF စသည်) မထိပါ
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
    return file;

  try {
    const img = await loadImage(file);
    const scale = Math.min(
      1,
      maxSize / Math.max(img.naturalWidth, img.naturalHeight),
    );
    const width = Math.round(img.naturalWidth * scale);
    const height = Math.round(img.naturalHeight * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;

    // PNG ရဲ့ ဖောက်ထွင်းနောက်ခံကို JPG ပြောင်းရင် အနက်မဖြစ်အောင် အဖြူခံ
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', quality),
    );

    // ပိုကြီးသွားရင် မူလအတိုင်း ပြန်သုံး
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], name, { type: 'image/jpeg' });
  } catch {
    return file;
  }
}
