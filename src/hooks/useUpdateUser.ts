import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api/user.api';
import type { UpdateUserRequest } from '../types/user';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserRequest }) => 
      userApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
    }
  });
};
