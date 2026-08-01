import { useQuery } from '@tanstack/react-query';
import { me } from '../api/auth';

export const useMe = () => {
  return useQuery({
    queryFn: me,
    queryKey: ['me'],
    retry: false, // permit retry
  });
};
