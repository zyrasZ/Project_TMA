import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { userApi } from '../api/user.api';
import type { GetUsersParams } from '../types/user';

export const useUsers = (params?: GetUsersParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userApi.getUsers(params),
    placeholderData: keepPreviousData
  });
};
