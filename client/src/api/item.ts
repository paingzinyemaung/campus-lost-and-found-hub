import { api } from '../services/api';

// ပစ္စည်းများအားလုံးကို ဆွဲယူရန် (GET /api/item/)
export const getItems = async () => {
  const res = await api.get('/item/');
  return res.data.data; // Array ကို တိုက်ရိုက် return ပြန်ပါမည်
};

// ပစ္စည်းတစ်ခုတည်းကို ဆွဲယူရန် (GET /api/item/:id)
export const getItemById = async (id: string) => {
  const res = await api.get(`/item/${id}`);
  return res.data.data; // Object ကို တိုက်ရိုက် return ပြန်ပါမည်
};

// ပစ္စည်းအသစ်တင်ရန် (POST /api/item/) - ပုံပါသောကြောင့် FormData အသုံးပြုရမည်
export const createItem = async (formData: FormData) => {
  const res = await api.post('/item/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

// ပစ္စည်း အချက်အလက်များ ပြင်ဆင်ရန် (PUT /api/item/:id)
export const updateItem = async ({ id, data }: { id: string; data: any }) => {
  const res = await api.put(`/item/${id}`, data);
  return res.data;
};

// ပစ္စည်းတစ်ခုကို ဖျက်ရန် (DELETE /api/item/:id)
export const deleteItem = async (id: string) => {
  const res = await api.delete(`/item/${id}`);
  return res.data;
};
