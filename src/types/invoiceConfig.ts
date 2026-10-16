export type InvoiceProvider =
  | 'MobiFone Invoice'
  | 'eHoadon (BKAV)'
  | 'meInvoice (MISA)'
  | 'Easy Invoice (Softdreams)'
  | 'VNPT Invoice'
  | 'sInvoice (Viettel)'
  | 'S-Invoice (Viettel)'
  | 'VNPAY Invoice'
  | (string & {});

export type InvoiceTaxRate =
  | '10%'
  | '8%'
  | '5%'
  | '0%'
  | 'KCT'
  | (string & {});

export type PaymentMethod =
  | 'TM'
  | 'CK'
  | 'TM/CK'
  | 'THE'
  | (string & {});

export interface InvoiceConfig {
  id: string;
  configName: string;
  stationId?: string;
  stationIds?: string[];     // Danh sách các trạm áp dụng
  provider: InvoiceProvider;
  pattern: string;           // Mẫu số (ví dụ: '1')
  serial: string;            // Ký hiệu (ví dụ: 'C24MQQ')
  taxRate: InvoiceTaxRate;   // Thuế suất (ví dụ: '10%')
  paymentMethod?: PaymentMethod;
  taxCode?: string;          // Mã số thuế
  username?: string;         // Tên đăng nhập
  password?: string;         // Mật khẩu
  apiBaseUrl?: string;       // Địa chỉ API (Base URL)
  hasDigitalSignature: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateInvoiceConfigInput = {
  configName: string;
  stationId?: string;
  stationIds?: string[];
  taxRate: InvoiceTaxRate;
  paymentMethod: PaymentMethod;
  provider: InvoiceProvider;
  pattern?: string;
  serial?: string;
  taxCode?: string;
  username?: string;
  password?: string;
  apiBaseUrl?: string;
  hasDigitalSignature?: boolean;
};

export type UpdateInvoiceConfigInput = Partial<CreateInvoiceConfigInput> & { id: string };

export interface GetInvoiceConfigsParams {
  search?: string;
  provider?: InvoiceProvider | null;
  first?: number;
  rows?: number;
}

export interface GetInvoiceConfigsResponse {
  data: InvoiceConfig[];
  total: number;
}
