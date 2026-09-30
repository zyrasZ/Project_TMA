import { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { X, Check, User } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddCompany } from '../../../../hooks/api/companies/useCompanies';
import { getCompanySchema, CompanyFormValues } from '../schemas';

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  companies: any[];
  onSuccess: () => void;
  showToast: any;
}

export const AddCompanyModal = ({ isOpen, onClose, companies, onSuccess, showToast }: AddCompanyModalProps) => {
  const { t } = useTranslation('common');
  const addCompanyMutation = useAddCompany();

  const companySchema = useMemo(() => getCompanySchema(t), [t]);

  const addForm = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: { name: '', taxCode: '', phone: '', email: '', username: '' }
  });

  useEffect(() => {
    if (isOpen) {
      addForm.reset();
    }
  }, [isOpen, addForm]);

  const onAddSubmit = (data: CompanyFormValues) => {
    if (companies.some(c => c.username === data.username)) {
      addForm.setError('username', { type: 'manual', message: t('companyManagement.validation.usernameExists') });
      return;
    }
    const createdCompany = {
      id: `000${companies.length + 1}`.slice(-4),
      ...data,
      status: 'active' as const,
    };
    
    addCompanyMutation.mutate(createdCompany, {
      onSuccess: () => {
        showToast({ title: t('companyManagement.toast.success'), message: t('companyManagement.toast.addSuccess'), severity: 'success' });
        onSuccess();
      }
    });
  };

  return (
    <Modal
      visible={isOpen}
      onHide={onClose}
      header={t('companyManagement.modal.addCompany')}
      className="w-[600px] md:w-[720px]"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="secondary" onClick={onClose} className="flex items-center gap-2 font-medium bg-surface hover:bg-surface-200 border-none">
            <X size={16} weight="bold" />
            {t('companyManagement.modal.cancel')}
          </Button>
          <Button variant="primary" onClick={addForm.handleSubmit(onAddSubmit)} className="flex items-center gap-2 font-medium text-white">
            <Check size={16} weight="bold" />
            {t('companyManagement.modal.save')}
          </Button>
        </div>
      }
    >
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <div className="w-[100px] h-[100px] bg-surface rounded-full flex items-center justify-center border border-border">
            <User size={48} className="text-content-hint" weight="light" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <div className="flex-[7]">
              <Input 
                label={t('companyManagement.modal.companyName')} 
                placeholder={t('companyManagement.modal.companyNamePlaceholder')}
                required 
                {...addForm.register('name')}
                error={addForm.formState.errors.name?.message}
              />
            </div>
            <div className="flex-[3]">
              <Input 
                label={t('companyManagement.table.taxCode')} 
                placeholder={t('companyManagement.modal.taxCodePlaceholder')}
                required 
                {...addForm.register('taxCode')}
                error={addForm.formState.errors.taxCode?.message}
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex-1">
              <Input 
                label={t('companyManagement.table.phone')} 
                placeholder={t('companyManagement.modal.phonePlaceholder')}
                required 
                {...addForm.register('phone')}
                error={addForm.formState.errors.phone?.message}
              />
            </div>
            <div className="flex-1">
              <Input 
                label={t('companyManagement.table.email')}
                placeholder={t('companyManagement.modal.emailPlaceholder')}
                required 
                {...addForm.register('email')}
                error={addForm.formState.errors.email?.message}
              />
            </div>
          </div>
          <div>
            <Input 
              label={t('companyManagement.table.username')} 
              placeholder={t('companyManagement.modal.usernamePlaceholder')}
              required 
              {...addForm.register('username')}
              error={addForm.formState.errors.username?.message}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
