import { useMutation, useQuery } from '@tanstack/react-query';
import { login, logout, me, register } from '../api/auth';

export const useMe = () => {
  return useQuery({
    queryFn: me,
    queryKey: ['me'],
    retry: false, // permit retry
  });
};

export const useUserLogin = () => {
  return useMutation({
    mutationFn: login,
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
