import { stationsMock } from '../../../mocks/stations.mock';
import type { InvoiceTaxRate, PaymentMethod, InvoiceProvider } from '../../../types/invoiceConfig';

// Danh sách lựa chọn cho trường Trạm xăng
export const STATION_OPTIONS = stationsMock.map((st) => ({ label: st.name, value: st.id }));

// Danh sách lựa chọn cho trường Thuế suất
export const TAX_RATE_OPTIONS: Array<{ label: string; value: InvoiceTaxRate }> = [
  { label: '10%', value: '10%' },
  { label: '8%', value: '8%' },
  { label: '5%', value: '5%' },
  { label: '0%', value: '0%' },
  { label: 'Không chịu thuế (KCT)', value: 'KCT' },
];

// Danh sách lựa chọn cho trường Hình thức thanh toán
export const PAYMENT_METHOD_OPTIONS: Array<{ label: string; value: PaymentMethod }> = [
  { label: 'Tiền mặt', value: 'TM' },
  { label: 'Chuyển khoản', value: 'CK' },
  { label: 'Tiền mặt / Chuyển khoản', value: 'TM/CK' },
  { label: 'Thẻ ngân hàng', value: 'THE' },
];

// Danh sách lựa chọn cho trường Đơn vị cung cấp hóa đơn
export const PROVIDER_OPTIONS: Array<{ label: string; value: InvoiceProvider }> = [
  { label: 'MobiFone Invoice', value: 'MobiFone Invoice' },
  { label: 'eHoadon (BKAV)', value: 'eHoadon (BKAV)' },
  { label: 'meInvoice (MISA)', value: 'meInvoice (MISA)' },
  { label: 'Easy Invoice (Softdreams)', value: 'Easy Invoice (Softdreams)' },
  { label: 'VNPT Invoice', value: 'VNPT Invoice' },
  { label: 'sInvoice (Viettel)', value: 'sInvoice (Viettel)' },
  { label: 'VNPAY Invoice', value: 'VNPAY Invoice' },
];

// Danh sách URL API mẫu tương ứng với từng nhà cung cấp
export const DEFAULT_PROVIDER_URLS: Record<string, string> = {
  'MobiFone Invoice': 'https://api-einvoice.mobifone.vn',
  'eHoadon (BKAV)': 'https://api.ehoadon.vn/WS/InvoiceService.asmx',
  'meInvoice (MISA)': 'https://api.meinvoice.vn/v1',
  'Easy Invoice (Softdreams)': 'https://api.easyinvoice.vn/api/publish',
  'VNPT Invoice': 'https://api-vinvoice.vnpt.vn/service',
  'sInvoice (Viettel)': 'https://api-sinvoice.viettel.vn/InvoiceAPI',
  'S-Invoice (Viettel)': 'https://api-sinvoice.viettel.vn/InvoiceAPI',
  'VNPAY Invoice': 'https://api.vnpayinvoice.vn',
};
