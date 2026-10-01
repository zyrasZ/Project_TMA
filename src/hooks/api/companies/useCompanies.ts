import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { companyApi, GetCompaniesParams } from '../../../api/companies.api';

export const useGetCompanies = (params?: GetCompaniesParams) => {
  return useQuery({
    queryKey: ['companies', params],
    queryFn: () => companyApi.getCompanies(params),
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
