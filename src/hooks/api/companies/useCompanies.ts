import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { companyApi } from '../../../api/companies.api';

export const useGetCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: companyApi.getCompanies,
  });
};

export const useAddCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: companyApi.addCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};

export const useEditCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: companyApi.updateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: companyApi.resetPassword,
  });
};
