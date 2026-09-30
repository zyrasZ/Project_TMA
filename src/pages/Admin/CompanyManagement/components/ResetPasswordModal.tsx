import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { X, Check } from '@phosphor-icons/react';
import { useResetPassword } from '../../../../hooks/api/companies/useCompanies';

interface ResetPasswordModalProps {
  company: any | null;
  onClose: () => void;
  showToast: any;
}

export const ResetPasswordModal = ({ company, onClose, showToast }: ResetPasswordModalProps) => {
  const { t } = useTranslation('common');
  const resetPasswordMutation = useResetPassword();

  const handleResetPassword = () => {
    const phone = company?.phone;
    const companyId = company?.id;
    
    if (companyId) {
      resetPasswordMutation.mutate(companyId, {
        onSuccess: (newPassword) => {
          showToast({
            title: t('companyManagement.toast.success'),
            message: t('companyManagement.toast.resetPasswordSuccess', { password: newPassword || phone }),
            severity: 'success',
          });
          onClose();
        }
      });
    }
  };

  return (
    <Modal
      visible={!!company}
      onHide={onClose}
      header={t('companyManagement.modal.resetPasswordTitle')}
      className="w-[480px]"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="secondary" onClick={onClose} className="flex items-center gap-2 font-medium">
            <X size={16} weight="bold" />
            {t('companyManagement.modal.cancel')}
          </Button>
          <Button
            variant="primary"
            className="flex items-center gap-2 font-medium text-white"
            onClick={handleResetPassword}
          >
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
              {t('companyManagement.modal.resetPasswordConfirmMsg')}
            </p>
          </div>
          <p className="text-sm text-content-sub pl-9">
            {t('companyManagement.modal.resetPasswordWarning1')}
            <span className="font-semibold text-content-main">{company.phone}</span>
          </p>
        </div>
      )}
    </Modal>
  );
};
