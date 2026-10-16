import { z } from 'zod';

// Schema xác thực (validation) dữ liệu form cấu hình hóa đơn
export const formSchema = z
  .object({
    configName: z.string().trim().min(1, 'Vui lòng nhập tên cấu hình'),
    stationIds: z.array(z.string()).min(1, 'Vui lòng chọn trạm'),
    taxRate: z.string().min(1, 'Vui lòng chọn thuế suất'),
    paymentMethod: z.string().min(1, 'Vui lòng chọn hình thức thanh toán'),
    provider: z.string().min(1, 'Vui lòng chọn đơn vị cung cấp'),
    taxCode: z.string().optional(),
    serial: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    apiBaseUrl: z.string().optional(),
    hasDigitalSignature: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Khi đã chọn nhà cung cấp, các trường có dấu sao đỏ (*) bắt buộc phải nhập và đúng định dạng
    if (data.provider) {
      if (!data.taxCode?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['taxCode'],
          message: 'Vui lòng nhập mã số thuế',
        });
      } else if (/\s/.test(data.taxCode)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['taxCode'],
          message: 'Mã số thuế không được chứa khoảng trắng',
        });
      }

      if (!data.serial?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['serial'],
          message: 'Vui lòng nhập ký hiệu',
        });
      } else if (/\s/.test(data.serial)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['serial'],
          message: 'Ký hiệu không được chứa khoảng trắng',
        });
      }

      if (!data.username?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['username'],
          message: 'Vui lòng nhập tên đăng nhập',
        });
      } else if (/\s/.test(data.username)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['username'],
          message: 'Tên đăng nhập không được chứa khoảng trắng',
        });
      }

      if (!data.password?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['password'],
          message: 'Vui lòng nhập mật khẩu',
        });
      }

      if (!data.apiBaseUrl?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['apiBaseUrl'],
          message: 'Vui lòng nhập địa chỉ API',
        });
      } else if (/\s/.test(data.apiBaseUrl)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['apiBaseUrl'],
          message: 'Địa chỉ API không được chứa khoảng trắng',
        });
      }
    }
  });

export type FormValues = z.infer<typeof formSchema>;
