import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { X, Check } from '@phosphor-icons/react';
import { useEditCompany } from '../../../../hooks/api/companies/useCompanies';

interface ToggleLockModalProps {
  company: any | null;
  onClose: () => void;
  showToast: any;
}

export const ToggleLockModal = ({ company, onClose, showToast }: ToggleLockModalProps) => {
  const { t } = useTranslation('common');
  const editCompanyMutation = useEditCompany();

  const handleToggleLock = () => {
    if (!company) return;
    const isLocking = company.status === 'active';
    const updatedCompany = { ...company, status: isLocking ? 'inactive' : 'active' };

    editCompanyMutation.mutate(updatedCompany, {
      onSuccess: () => {
        showToast({
          title: t('companyManagement.toast.success'),
          message: isLocking ? t('companyManagement.toast.lockSuccess') : t('companyManagement.toast.unlockSuccess'),
          severity: 'success',
        });
        onClose();
      }
    });
  };

  return (
    <Modal
      visible={!!company}
      onHide={onClose}
      header={company?.status === 'active' ? t('companyManagement.modal.lockTitle') : t('companyManagement.modal.unlockTitle')}
      className="w-[480px]"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="secondary" onClick={onClose} className="flex items-center gap-2 font-medium">
            <X size={16} weight="bold" />
            {t('companyManagement.modal.cancel')}
          </Button>
          <Button variant="primary" onClick={handleToggleLock} className="flex items-center gap-2 font-medium text-white">
            <Check size={16} weight="bold" />
            {t('companyManagement.modal.confirm')}
          </Button>
        </div>
      }
    >
      {company && (
        <div className="px-6 py-5 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <span className="text-alert shrink-0 mt-0.5">
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1.5L1 18.5H21L11 1.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="11" cy="15.5" r="0.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </span>
            <p className="text-sm font-semibold text-content-main">
              {company.status === 'active'
                ? t('companyManagement.modal.lockConfirmMsg')
                : t('companyManagement.modal.unlockConfirmMsg')}
            </p>
          </div>
          <p className="text-sm text-content-sub pl-9">
            {company.status === 'active'
              ? t('companyManagement.modal.lockWarning')
              : t('companyManagement.modal.unlockWarning')}
          </p>
        </div>
      )}
    </Modal>
  );
};
