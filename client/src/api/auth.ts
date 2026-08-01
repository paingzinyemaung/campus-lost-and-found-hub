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
