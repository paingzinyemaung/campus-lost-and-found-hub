import axios from 'axios';

const apiOrigin =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:3000' : '');

export const api = axios.create({
  baseURL: `${apiOrigin}/api`,
  timeout: 30000,
  withCredentials: true,
});
