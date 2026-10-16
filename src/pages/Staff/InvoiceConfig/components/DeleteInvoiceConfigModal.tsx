import { useTranslation } from 'react-i18next';
import { Warning, X, Check } from '@phosphor-icons/react';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import type { InvoiceConfig } from '../../../../types/invoiceConfig';

interface DeleteInvoiceConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: InvoiceConfig | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const DeleteInvoiceConfigModal = ({
  isOpen,
  onClose,
  config: _config,
  onConfirm,
  isLoading,
}: DeleteInvoiceConfigModalProps) => {
  const { t } = useTranslation('common');

  const modalFooter = (
    <div className="flex items-center justify-end gap-3 w-full">
      <Button
        type="button"
        variant="secondary"
        onClick={onClose}
        className="px-5 border-none bg-[#EAEBEB] hover:bg-gray-200 text-content-main flex items-center gap-1.5 font-medium"
      >
        <X size={16} weight="bold" />
        <span>{t('invoiceConfig.deleteModal.cancel')}</span>
      </Button>

      <Button
        type="button"
        variant="primary"
        onClick={onConfirm}
        disabled={isLoading}
        className="px-5 flex items-center gap-1.5 font-medium"
      >
        <Check size={16} weight="bold" />
        <span>{t('invoiceConfig.deleteModal.confirm')}</span>
      </Button>
    </div>
  );

  return (
    <Modal
      visible={isOpen}
      onHide={onClose}
      header={t('invoiceConfig.deleteModal.title')}
      footer={modalFooter}
      className="w-[90vw] max-w-[520px]"
      contentClassName="bg-white p-6"
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <Warning size={24} weight="bold" className="text-[#F04438] flex-shrink-0" />
          <h4 className="text-[15px] sm:text-[16px] font-semibold text-content-main">
            {t('invoiceConfig.deleteModal.confirmMsg')}
          </h4>
        </div>

        <p className="text-[13.5px] sm:text-[14px] text-content-sub leading-relaxed">
          {t('invoiceConfig.deleteModal.warning')}
        </p>
      </div>
    </Modal>
  );
};
