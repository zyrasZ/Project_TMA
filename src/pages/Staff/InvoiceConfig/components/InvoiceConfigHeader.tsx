import { useTranslation } from 'react-i18next';
import { Plus } from '@phosphor-icons/react';
import { Button } from '../../../../components/ui/Button';

interface InvoiceConfigHeaderProps {
  onAddConfig: () => void;
}

export const InvoiceConfigHeader = ({ onAddConfig }: InvoiceConfigHeaderProps) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <h1 className="text-[24px] font-bold text-content-main tracking-tight">
        {t('invoiceConfig.title')}
      </h1>

      <Button
        variant="primary"
        onClick={onAddConfig}
        className="flex items-center gap-2 px-5 py-2.5 font-medium shadow-sm transition-all duration-150"
      >
        <Plus size={18} weight="bold" />
        <span>{t('invoiceConfig.addBtn')}</span>
      </Button>
    </div>
  );
};
