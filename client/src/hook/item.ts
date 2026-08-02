import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../api/item';

// Item အားလုံးဆွဲယူရန် Hook
export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: getItems,
  });
};

// Item တစ်ခုတည်းဆွဲယူရန် Hook
export const useItem = (id: string) => {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => getItemById(id),
    enabled: !!id, // ID ရှိမှသာ API ခေါ်ရန်
  });
};

// Item အသစ်တင်ရန် Hook
export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

// Item ပြင်ဆင်ရန် Hook
export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

// Item ဖျက်ရန် Hook
export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};
