import { z } from 'zod';

export const getCompanySchema = (t: any) => z.object({
  name: z.string().min(1, t('companyManagement.validation.invalidName')),
  taxCode: z.string().regex(/^\d{10}(\d{3})?$/, t('companyManagement.validation.invalidTaxCode')),
  phone: z.string().regex(/^(0|\+84)[0-9]{9}$/, t('companyManagement.validation.invalidPhone')),
  email: z.string().email(t('companyManagement.validation.invalidEmail')),
  username: z.string()
    .min(4, t('companyManagement.validation.invalidUsername'))
    .regex(/^[a-zA-Z0-9_]+$/, t('companyManagement.validation.invalidUsername'))
});

export type CompanyFormValues = z.infer<ReturnType<typeof getCompanySchema>>;
