import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  invoiceConfigApi
} from '../../../api/invoiceConfig.api';
import type {
  CreateInvoiceConfigInput,
  UpdateInvoiceConfigInput,
  GetInvoiceConfigsParams
} from '../../../types/invoiceConfig';

export const INVOICE_CONFIGS_QUERY_KEY = ['invoiceConfigs'];

export const useGetInvoiceConfigs = (params?: GetInvoiceConfigsParams) => {
  return useQuery({
    queryKey: [...INVOICE_CONFIGS_QUERY_KEY, params],
    queryFn: () => invoiceConfigApi.getInvoiceConfigs(params),
  });
};

export const useGetInvoiceConfigById = (id?: string | null) => {
  return useQuery({
    queryKey: ['invoiceConfig', id],
    queryFn: () => id ? invoiceConfigApi.getInvoiceConfigById(id) : Promise.resolve(null),
    enabled: !!id,
  });
};

export const useCreateInvoiceConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newConfig: CreateInvoiceConfigInput) => invoiceConfigApi.createInvoiceConfig(newConfig),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICE_CONFIGS_QUERY_KEY });
    },
  });
};

export const useUpdateInvoiceConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedConfig: UpdateInvoiceConfigInput) => invoiceConfigApi.updateInvoiceConfig(updatedConfig),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICE_CONFIGS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['invoiceConfig'] });
    },
  });
};

export const useDeleteInvoiceConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invoiceConfigApi.deleteInvoiceConfig(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICE_CONFIGS_QUERY_KEY });
    },
  });
};
