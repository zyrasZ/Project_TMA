import { useTranslation } from 'react-i18next';
import { CheckCircle, X } from '@phosphor-icons/react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import type { InvoiceConfig } from '../../../../types/invoiceConfig';
import { STATION_OPTIONS, PAYMENT_METHOD_OPTIONS } from '../constants';

interface InvoiceConfigDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: InvoiceConfig | null;
}

export const InvoiceConfigDetailModal = ({
  isOpen,
  onClose,
  config,
}: InvoiceConfigDetailModalProps) => {
  const { t } = useTranslation('common');

  if (!config) return null;

  // Xử lý hiển thị danh sách trạm
  const getStationDisplay = () => {
    if (config.stationIds?.includes('all') || (config.stationIds && config.stationIds.length >= STATION_OPTIONS.length)) {
      return t('invoiceConfig.detailModal.stationAll');
    }
    if (!config.stationIds || config.stationIds.length === 0) {
      if (config.stationId) {
        const found = STATION_OPTIONS.find((st) => st.value === config.stationId);
        return found ? found.label : config.stationId;
      }
      return '—';
    }
    const matched = STATION_OPTIONS.filter((st) => config.stationIds?.includes(st.value));
    return matched.length > 0 ? matched.map((st) => st.label).join(', ') : '—';
  };

  // Xử lý hiển thị hình thức thanh toán
  const getPaymentMethodDisplay = () => {
    if (!config.paymentMethod) return '—';
    const found = PAYMENT_METHOD_OPTIONS.find((p) => p.value === config.paymentMethod);
    return found ? found.label : config.paymentMethod;
  };

  const detailRows = [
    { label: t('invoiceConfig.detailModal.id'), value: config.id },
    {
      label: t('invoiceConfig.detailModal.configName'),
      value: <span className="font-semibold text-content-main">{config.configName}</span>,
    },
    { label: t('invoiceConfig.detailModal.station'), value: getStationDisplay() },
    { label: t('invoiceConfig.detailModal.taxRate'), value: config.taxRate },
    { label: t('invoiceConfig.detailModal.paymentMethod'), value: getPaymentMethodDisplay() },
    { label: t('invoiceConfig.detailModal.provider'), value: config.provider },
    { label: t('invoiceConfig.detailModal.pattern'), value: config.pattern || '' },
    { label: t('invoiceConfig.detailModal.taxCode'), value: config.taxCode || '' },
    { label: t('invoiceConfig.detailModal.serial'), value: config.serial || '' },
    { label: t('invoiceConfig.detailModal.username'), value: config.username || '' },
    { label: t('invoiceConfig.detailModal.password'), value: config.password || '' },
    { label: t('invoiceConfig.detailModal.apiBaseUrl'), value: config.apiBaseUrl || '' },
    {
      label: t('invoiceConfig.detailModal.digitalSignature'),
      value: config.hasDigitalSignature ? (
        <span className="inline-flex items-center">
          <CheckCircle size={18} className="text-primary" weight="regular" />
        </span>
      ) : null,
    },
  ];

  const modalFooter = (
    <div className="flex items-center justify-end w-full">
      <Button
        type="button"
        variant="secondary"
        onClick={onClose}
        className="px-6 border-none bg-[#EAEBEB] hover:bg-gray-200 text-content-main flex items-center gap-1.5 font-medium"
      >
        <X size={16} weight="bold" />
        <span>{t('invoiceConfig.detailModal.close')}</span>
      </Button>
    </div>
  );

  return (
    <Modal
      visible={isOpen}
      onHide={onClose}
      header={t('invoiceConfig.detailModal.title')}
      footer={modalFooter}
      className="w-[92vw] sm:w-[600px] max-w-[600px] h-[800px] max-h-[92vh] flex flex-col"
      contentClassName="p-0 bg-white flex-1 flex flex-col overflow-y-auto"
    >
      <div className="w-full flex-1 flex flex-col">
        <table className="w-full border-collapse">
          <tbody>
            {detailRows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[#E2E4E8]"
              >
                <td className="w-[150px] sm:w-[160px] bg-[#EEF3F3] px-4 py-2.5 text-[13px] font-medium text-content-main border-r border-[#E2E4E8] align-middle select-none">
                  {row.label}
                </td>
                <td className="px-4 py-2.5 text-[13px] text-content-main bg-white break-words align-middle leading-normal">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Khoảng trống bên dưới bảng tự động co giãn lấp đầy chiều cao 800px trước footer */}
        <div className="flex-1 bg-white min-h-[40px]" />
      </div>
    </Modal>
  );
};
