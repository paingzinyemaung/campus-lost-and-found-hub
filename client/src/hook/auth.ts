import { useMutation, useQuery } from '@tanstack/react-query';
import { login, me } from '../api/auth';

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
