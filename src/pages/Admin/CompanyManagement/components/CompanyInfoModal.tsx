import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { Avatar } from '../../../../components/ui/Avatar';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import { X } from '@phosphor-icons/react';

interface CompanyInfoModalProps {
  company: any | null;
  onClose: () => void;
}

export const CompanyInfoModal = ({ company, onClose }: CompanyInfoModalProps) => {
  const { t } = useTranslation('common');

  return (
    <Modal
      visible={!!company}
      onHide={onClose}
      header={t('companyManagement.modal.companyInfo')}
      className="w-[600px] md:w-[720px]"
      footer={
        <Button variant="secondary" onClick={onClose} className="flex items-center gap-2 font-medium">
          <X size={16} weight="bold" />
          {t('companyManagement.modal.close')}
        </Button>
      }
    >
      {company && (
        <div className="flex flex-col border-border">
          {[
            { label: t('companyManagement.table.id'), value: company.id },
            { 
              label: t('companyManagement.table.company'), 
              value: (
                <div className="flex items-center gap-3">
                  <Avatar label="TMA" shape="circle" className="bg-primary/10 text-primary font-bold text-[10px]" />
                  <span className="font-semibold">{company.name}</span>
                </div>
              )
            },
            { label: t('companyManagement.table.username'), value: company.username },
            { label: t('companyManagement.table.taxCode'), value: company.taxCode },
            { label: t('companyManagement.table.phone'), value: company.phone },
            { label: t('companyManagement.table.email'), value: company.email },
            { 
              label: t('companyManagement.table.status'), 
              value: (
                <StatusBadge 
                  color={company.status === 'active' ? 'green' : 'grey'}
                  label={company.status === 'active' ? t('companyManagement.statusActive') : t('companyManagement.statusInactive')}
                />
              )
            }
          ].map((row, idx, arr) => (
            <div key={idx} className={"flex border-border " + (idx !== arr.length - 1 ? "border-b" : "")}>
              <div className="w-[160px] md:w-[200px] bg-surface px-4 py-3 text-sm font-semibold text-content-main border-r border-border shrink-0 flex items-center">
                {row.label}
              </div>
              <div className="flex-1 px-4 py-3 text-sm text-content-main truncate flex items-center">
                {row.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};
