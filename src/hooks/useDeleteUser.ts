import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api/user.api';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
    }
  });
};
