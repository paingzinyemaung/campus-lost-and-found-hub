import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api', // ကိုယ့် Backend URL နဲ့ ချိန်ပါ
  timeout: 10000, // timeout after 10 secs
  withCredentials: true,
});
