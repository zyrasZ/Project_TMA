import { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { Avatar } from '../../../../components/ui/Avatar';
import { X, Check } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditCompany } from '../../../../hooks/api/companies/useCompanies';
import { getCompanySchema, CompanyFormValues } from '../schemas';

interface EditCompanyModalProps {
  company: any | null;
  onClose: () => void;
  companies: any[];
  showToast: any;
}

export const EditCompanyModal = ({ company, onClose, companies, showToast }: EditCompanyModalProps) => {
  const { t } = useTranslation('common');
  const editCompanyMutation = useEditCompany();

  const companySchema = useMemo(() => getCompanySchema(t), [t]);

  const editForm = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: { name: '', taxCode: '', phone: '', email: '', username: '' }
  });

  useEffect(() => {
    if (company) {
      editForm.reset({
        name: company.name,
        taxCode: company.taxCode,
        phone: company.phone,
        email: company.email,
        username: company.username,
      });
    }
  }, [company, editForm]);

  const onEditSubmit = (data: CompanyFormValues) => {
    if (companies.some(c => c.username === data.username && c.id !== company?.id)) {
      editForm.setError('username', { type: 'manual', message: t('companyManagement.validation.usernameExists') });
      return;
    }
    const updatedCompany = companies.find(c => c.id === company?.id);
    if (!updatedCompany) return;

    editCompanyMutation.mutate({ ...updatedCompany, ...data }, {
      onSuccess: () => {
        showToast({ title: t('companyManagement.toast.success'), message: t('companyManagement.toast.updateSuccess'), severity: 'success' });
        onClose();
      }
    });
  };

  return (
    <Modal
      visible={!!company}
      onHide={onClose}
      header={t('companyManagement.modal.updateCompany')}
      className="w-[600px] md:w-[720px]"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="secondary" onClick={onClose} className="flex items-center gap-2 font-medium bg-surface hover:bg-surface-200 border-none">
            <X size={16} weight="bold" />
            {t('companyManagement.modal.cancel')}
          </Button>
          <Button variant="primary" onClick={editForm.handleSubmit(onEditSubmit)} className="flex items-center gap-2 font-medium text-white">
            <Check size={16} weight="bold" />
            {t('companyManagement.modal.save')}
          </Button>
        </div>
      }
    >
      {company && (
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="w-[100px] h-[100px] bg-primary/10 rounded-full flex items-center justify-center border border-border overflow-hidden">
              <Avatar label={company.name?.slice(0,3).toUpperCase() || 'TMA'} shape="circle" className="w-full h-full bg-primary/10 text-primary font-bold text-[22px]" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="flex-[7]">
                <Input
                  label={t('companyManagement.modal.companyName')}
                  placeholder={t('companyManagement.modal.companyNamePlaceholder')}
                  required
                  {...editForm.register('name')}
                  error={editForm.formState.errors.name?.message}
                />
              </div>
              <div className="flex-[3]">
                <Input
                  label={t('companyManagement.table.taxCode')}
                  placeholder={t('companyManagement.modal.taxCodePlaceholder')}
                  required
                  {...editForm.register('taxCode')}
                  error={editForm.formState.errors.taxCode?.message}
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-1">
                <Input
                  label={t('companyManagement.table.phone')}
                  placeholder={t('companyManagement.modal.phonePlaceholder')}
                  required
                  {...editForm.register('phone')}
                  error={editForm.formState.errors.phone?.message}
                />
              </div>
              <div className="flex-1">
                <Input
                  label={t('companyManagement.table.email')}
                  placeholder={t('companyManagement.modal.emailPlaceholder')}
                  required
                  {...editForm.register('email')}
                  error={editForm.formState.errors.email?.message}
                />
              </div>
            </div>
            <div>
              <Input
                label={t('companyManagement.table.username')}
                placeholder={t('companyManagement.modal.usernamePlaceholder')}
                required
                {...editForm.register('username')}
                error={editForm.formState.errors.username?.message}
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
