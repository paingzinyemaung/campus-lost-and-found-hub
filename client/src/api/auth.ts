import { api } from '../services/api';

export const me = async () => {
  try {
    const res = await api.get('/auth/me');
    return res;
  } catch (error) {
    throw error;
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post('/auth/login', {
      email,
      password,
    });
    return res;
    // console.log(res.data);
    // alert('Login successful');
  } catch (error) {
    throw error;
  }
};

export const register = async ({
  name,
  email,
  password,
  studentId,
}: {
  name: string;
  email: string;
  password: string;
  studentId: string;
}) => {
  try {
    const res = await api.post('/auth/register', {
      name,
      email,
      password,
      studentId,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

// Backend က Logout API ကို ခေါ်မယ့် function
export const logout = async () => {
  // withCredentials: true ပါမှ Cookie တွေကို Browser က အလွယ်တကူ ပို့ပေး/ဖျက်ပေးမှာ ဖြစ်ပါတယ်
  const response = await api.post(
    '/auth/logout',
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
};
