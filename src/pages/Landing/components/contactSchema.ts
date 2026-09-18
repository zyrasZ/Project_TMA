import { z } from 'zod';

const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'Vui lòng nhập họ tên hợp lệ' }),
  email: z.string().trim().min(1, { message: 'Vui lòng nhập email' }).email({ message: 'Email không hợp lệ' }),
  phone: z.string().trim().regex(phoneRegex, { message: 'Số điện thoại không hợp lệ (VD: 0912345678)' }),
  company: z.string().trim().min(2, { message: 'Vui lòng nhập tên công ty' }),
  package: z.enum(['basic', 'standard', 'advanced']),
  message: z.string().trim().min(10, { message: 'Vui lòng nhập lời nhắn (ít nhất 10 ký tự)' }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
