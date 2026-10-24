import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, logout, me, register } from '../api/auth';

export const useMe = () => {
  return useQuery({
    queryFn: me,
    queryKey: ['me'],
    retry: false, // Login မဝင်ရသေးရင် (401) ထပ်မကြိုးစားဘူး
    staleTime: 5 * 60 * 1000, // ၅ မိနစ်အတွင်း page ပြောင်းလည်း /me ကို ထပ်မခေါ်ဘူး
  });
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Login ပြီးတာနဲ့ Navbar က user ကို ချက်ချင်းသိအောင်
      // (promise ကို return မလုပ်ပါနဲ့: Login page က toast/navigate ကို မစောင့်ရအောင်)
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};

export const useUserRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useUserLogout = () => {
  return useMutation({
    mutationFn: async () => {
      return logout();
    },
  });
};
