// Cloudinary ပုံကို လိုသလောက်သာ ဆွဲဖို့ (အရွယ်အစားနဲ့ format အလိုအလျောက်)
export const optimizeImage = (url: string, width = 600) =>
  url.includes('res.cloudinary.com') && url.includes('/upload/')
    ? url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`)
    : url;
