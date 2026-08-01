import { api } from '../services/api';

export const me = async () => {
  try {
    const res = await api.get('/auth/me');
    return res;
  } catch (error) {
    throw error;
  }
};
