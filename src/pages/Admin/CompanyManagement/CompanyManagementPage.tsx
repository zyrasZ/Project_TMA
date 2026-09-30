import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Plus, MagnifyingGlass, ArrowsClockwise, X, User, Check } from '@phosphor-icons/react';
import { Avatar } from '../../../components/ui/Avatar';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { DropdownButton } from '../../../components/ui/DropdownButton';
import { Paginator } from '../../../components/ui/Paginator';
import { Modal } from '../../../components/ui/Modal';
import {
  DataTable,
  DataTableTableContainer,
  DataTableTable,
  DataTableTHead,
  DataTableTHeadRow,
  DataTableTHeadCell,
  DataTableTBody,
  DataTableRow,
  DataTableCell,
  DataTableLoading
} from '../../../components/ui/DataTable';

import { useGetCompanies, useAddCompany, useEditCompany, useResetPassword } from '../../../hooks/api/companies/useCompanies';
import { useAppToast } from '../../../components/ui/Toast';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const getCompanySchema = (t: any) => z.object({
  name: z.string().min(1, t('companyManagement.validation.invalidName')),
  taxCode: z.string().regex(/^\d{10}(\d{3})?$/, t('companyManagement.validation.invalidTaxCode')),
  phone: z.string().regex(/^(0|\+84)[0-9]{9}$/, t('companyManagement.validation.invalidPhone')),
  email: z.string().email(t('companyManagement.validation.invalidEmail')),
  username: z.string()
    .min(4, t('companyManagement.validation.invalidUsername'))
    .regex(/^[a-zA-Z0-9_]+$/, t('companyManagement.validation.invalidUsername'))
});

type CompanyFormValues = z.infer<ReturnType<typeof getCompanySchema>>;

export const CompanyManagementPage = () => {
  const { t } = useTranslation('common');
  const { showToast } = useAppToast();
  
  const { data: companies = [], isLoading } = useGetCompanies();
  const addCompanyMutation = useAddCompany();
  const editCompanyMutation = useEditCompany();
  const resetPasswordMutation = useResetPassword();
  
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any | null>(null);
  
  const [lockingCompany, setLockingCompany] = useState<any | null>(null);
  const [resetPasswordCompany, setResetPasswordCompany] = useState<any | null>(null);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(30);

  const companySchema = useMemo(() => getCompanySchema(t), [t]);

  // --- React Hook Form: Thêm Công Ty ---
  const addForm = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: { name: '', taxCode: '', phone: '', email: '', username: '' }
  });

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
        addForm.reset();
        setIsAddCompanyModalOpen(false);
        setFirst(0);
        showToast({ title: t('companyManagement.toast.success'), message: t('companyManagement.toast.addSuccess'), severity: 'success' });
      }
    });
  };

  // --- React Hook Form: Sửa Công Ty ---
  const editForm = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: { name: '', taxCode: '', phone: '', email: '', username: '' }
  });

  const handleOpenEdit = (company: any) => {
    setEditingCompany(company);
    editForm.reset({
      name: company.name,
      taxCode: company.taxCode,
      phone: company.phone,
      email: company.email,
      username: company.username,
    });
  };

  const onEditSubmit = (data: CompanyFormValues) => {
    if (companies.some(c => c.username === data.username && c.id !== editingCompany?.id)) {
      editForm.setError('username', { type: 'manual', message: t('companyManagement.validation.usernameExists') });
      return;
    }
    const updatedCompany = companies.find(c => c.id === editingCompany.id);
    if (!updatedCompany) return;

    editCompanyMutation.mutate({ ...updatedCompany, ...data }, {
      onSuccess: () => {
        setEditingCompany(null);
        showToast({ title: t('companyManagement.toast.success'), message: t('companyManagement.toast.updateSuccess'), severity: 'success' });
      }
    });
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = search 
      ? company.name.toLowerCase().includes(search.toLowerCase()) || 
        company.username.toLowerCase().includes(search.toLowerCase()) ||
        company.email.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesStatus = status && status !== 'all' ? company.status === status : true;
    return matchesSearch && matchesStatus;
  });

  const paginatedCompanies = filteredCompanies.slice(first, first + rows);

  const handleToggleLock = () => {
    if (!lockingCompany) return;
    const isLocking = lockingCompany.status === 'active';
    const updatedCompany = { ...lockingCompany, status: isLocking ? 'inactive' : 'active' };

    editCompanyMutation.mutate(updatedCompany, {
      onSuccess: () => {
        setLockingCompany(null);
        showToast({
          title: t('companyManagement.toast.success'),
          message: isLocking ? t('companyManagement.toast.lockSuccess') : t('companyManagement.toast.unlockSuccess'),
          severity: 'success',
        });
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-h5 text-content-main m-0 font-semibold">{t('companyManagement.title')}</h1>
        <Button 
          variant="primary" 
          className="text-white text-[14px] font-semibold leading-[20px] tracking-[0.01em]"
          onClick={() => {
            addForm.reset();
            setIsAddCompanyModalOpen(true);
          }}
        >
          <Plus weight="bold" size={15} color="white" />
          {t('companyManagement.addCompany')}
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-border">
        {/* Filter Section */}
        <div className="flex flex-col">
          {/* Row 1: Tìm kiếm */}
          <div className="p-4 border-b border-border">
            <div className="w-full md:w-[320px]">
              <Input 
                label={t('companyManagement.search')}
                placeholder={t('companyManagement.searchPlaceholder')}
                iconLeft={<MagnifyingGlass size={20} />}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Trạng thái & Đặt lại */}
          <div className="p-4 flex flex-col md:flex-row justify-between items-end">
            {/* Trạng thái */}
            <div className="w-full md:w-[320px]">
              <Select 
                label={t('companyManagement.status')}
                placeholder={t('companyManagement.statusPlaceholder')}
                options={[
                  { label: t('companyManagement.statusAll'), value: 'all' },
                  { label: t('companyManagement.statusActive'), value: 'active' },
                  { label: t('companyManagement.statusInactive'), value: 'inactive' }
                ]}
                value={status}
                onChange={(e) => setStatus(e.value)}
              />
            </div>

            {/* Nút đặt lại */}
            <Button 
              variant="secondary" 
              className="flex items-center gap-2 font-medium mt-4 md:mt-0"
              onClick={() => {
                setSearch('');
                setStatus(null);
              }}
            >
              <ArrowsClockwise weight="bold" size={16} />
              {t('companyManagement.resetFilter')}
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <DataTable>
          {isLoading && <DataTableLoading />}
          <DataTableTableContainer>
            <DataTableTable>
              <DataTableTHead>
                <DataTableTHeadRow>
                  <DataTableTHeadCell className="w-[80px]">{t('companyManagement.table.id')}</DataTableTHeadCell>
                  <DataTableTHeadCell className="min-w-[250px]">{t('companyManagement.table.company')}</DataTableTHeadCell>
                  <DataTableTHeadCell>{t('companyManagement.table.username')}</DataTableTHeadCell>
                  <DataTableTHeadCell>{t('companyManagement.table.taxCode')}</DataTableTHeadCell>
                  <DataTableTHeadCell>{t('companyManagement.table.phone')}</DataTableTHeadCell>
                  <DataTableTHeadCell>{t('companyManagement.table.email')}</DataTableTHeadCell>
                  <DataTableTHeadCell>{t('companyManagement.table.status')}</DataTableTHeadCell>
                  <DataTableTHeadCell className="w-[200px]">{t('companyManagement.table.actions')}</DataTableTHeadCell>
                </DataTableTHeadRow>
              </DataTableTHead>
              <DataTableTBody>
                {paginatedCompanies.length === 0 ? (
                  <DataTableRow>
                    <DataTableCell colSpan={7} className="text-content-main py-4">
                      {t('companyManagement.table.empty')}
                    </DataTableCell>
                    <DataTableCell>
                      <DropdownButton 
                        label={t('companyManagement.table.accessCompanyPage')}
                        size="sm"
                        items={[]}
                        className="w-full whitespace-nowrap [&>button]:w-full [&>button]:justify-between [&>button>span:first-child]:w-full [&>button>span:first-child]:text-center [&>button>span:first-child]:tracking-[0.01em] opacity-50 pointer-events-none"
                      />
                    </DataTableCell>
                  </DataTableRow>
                ) : (
                  paginatedCompanies.map((company) => (
                    <DataTableRow key={company.id}>
                      <DataTableCell>{company.id}</DataTableCell>
                      <DataTableCell>
                        <div className="flex items-center gap-3">
                          <Avatar label="TMA" shape="circle" className="bg-primary/10 text-primary font-bold text-[10px]" />
                          <span className="font-semibold text-content-main">{company.name}</span>
                        </div>
                      </DataTableCell>
                      <DataTableCell>{company.username}</DataTableCell>
                      <DataTableCell>{company.taxCode}</DataTableCell>
                      <DataTableCell>{company.phone}</DataTableCell>
                      <DataTableCell>{company.email}</DataTableCell>
                      <DataTableCell>
                        <StatusBadge 
                          color={company.status === 'active' ? 'green' : 'grey'}
                          label={company.status === 'active' ? t('companyManagement.statusActive') : t('companyManagement.statusInactive')}
                        />
                      </DataTableCell>
                      <DataTableCell>
                        <DropdownButton 
                          label={t('companyManagement.table.accessCompanyPage')}
                          size="sm"
                          items={[
                            { label: t('companyManagement.table.viewInfo'), icon: 'pi pi-info-circle', command: () => setSelectedCompany(company) },
                            { label: t('companyManagement.table.updateInfo'), icon: 'pi pi-pencil', command: () => handleOpenEdit(company) },
                            { label: company.status === 'active' ? t('companyManagement.table.lockCompany') : t('companyManagement.table.unlockCompany'), icon: company.status === 'active' ? 'pi pi-lock' : 'pi pi-lock-open', command: () => setLockingCompany(company) },
                            { label: t('companyManagement.table.resetPassword'), icon: 'pi pi-key', command: () => setResetPasswordCompany(company) },
                          ]} 
                          className="w-full whitespace-nowrap [&>button]:w-full [&>button]:justify-between [&>button>span:first-child]:w-full [&>button>span:first-child]:text-center [&>button>span:first-child]:tracking-[0.01em]"
                        />
                      </DataTableCell>
                    </DataTableRow>
                  ))
                )}
              </DataTableTBody>
            </DataTableTable>
          </DataTableTableContainer>
          
          <Paginator 
            first={first}
            rows={rows}
            totalRecords={filteredCompanies.length}
            itemName={t('companyManagement.itemName')}
            onPageChange={(e) => {
              setFirst(e.first);
              setRows(e.rows);
            }}
            className="border-t border-border"
          />
        </DataTable>
      </div>

      {/* Modal Thông tin công ty */}
      <Modal
        visible={!!selectedCompany}
        onHide={() => setSelectedCompany(null)}
        header={t('companyManagement.modal.companyInfo')}
        className="w-[600px] md:w-[720px]"
        footer={
          <Button variant="secondary" onClick={() => setSelectedCompany(null)} className="flex items-center gap-2 font-medium">
            <X size={16} weight="bold" />
            {t('companyManagement.modal.close')}
          </Button>
        }
      >
        {selectedCompany && (
          <div className="flex flex-col border-border">
            {[
              { label: t('companyManagement.table.id'), value: selectedCompany.id },
              { 
                label: t('companyManagement.table.company'), 
                value: (
                  <div className="flex items-center gap-3">
                    <Avatar label="TMA" shape="circle" className="bg-primary/10 text-primary font-bold text-[10px]" />
                    <span className="font-semibold">{selectedCompany.name}</span>
                  </div>
                )
              },
              { label: t('companyManagement.table.username'), value: selectedCompany.username },
              { label: t('companyManagement.table.taxCode'), value: selectedCompany.taxCode },
              { label: t('companyManagement.table.phone'), value: selectedCompany.phone },
              { label: t('companyManagement.table.email'), value: selectedCompany.email },
              { 
                label: t('companyManagement.table.status'), 
                value: (
                  <StatusBadge 
                    color={selectedCompany.status === 'active' ? 'green' : 'grey'}
                    label={selectedCompany.status === 'active' ? t('companyManagement.statusActive') : t('companyManagement.statusInactive')}
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

      {/* Modal Thêm công ty mới */}
      <Modal
        visible={isAddCompanyModalOpen}
        onHide={() => {
          setIsAddCompanyModalOpen(false);
          addForm.reset();
        }}
        header={t('companyManagement.modal.addCompany')}
        className="w-[600px] md:w-[720px]"
        footer={
          <div className="flex justify-end gap-3 w-full">
            <Button variant="secondary" onClick={() => {
              setIsAddCompanyModalOpen(false);
              addForm.reset();
            }} className="flex items-center gap-2 font-medium bg-surface hover:bg-surface-200 border-none">
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

      {/* Modal Cập nhật thông tin công ty */}
      <Modal
        visible={!!editingCompany}
        onHide={() => {
          setEditingCompany(null);
          editForm.reset();
        }}
        header={t('companyManagement.modal.updateCompany')}
        className="w-[600px] md:w-[720px]"
        footer={
          <div className="flex justify-end gap-3 w-full">
            <Button variant="secondary" onClick={() => {
              setEditingCompany(null);
              editForm.reset();
            }} className="flex items-center gap-2 font-medium bg-surface hover:bg-surface-200 border-none">
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
        {editingCompany && (
          <div className="p-6">
            <div className="flex justify-center mb-6">
              <div className="w-[100px] h-[100px] bg-primary/10 rounded-full flex items-center justify-center border border-border overflow-hidden">
                <Avatar label={editingCompany.name?.slice(0,3).toUpperCase() || 'TMA'} shape="circle" className="w-full h-full bg-primary/10 text-primary font-bold text-[22px]" />
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

      {/* Modal Khóa / Mở khóa công ty */}
      <Modal
        visible={!!lockingCompany}
        onHide={() => setLockingCompany(null)}
        header={lockingCompany?.status === 'active' ? t('companyManagement.modal.lockTitle') : t('companyManagement.modal.unlockTitle')}
        className="w-[480px]"
        footer={
          <div className="flex justify-end gap-3 w-full">
            <Button variant="secondary" onClick={() => setLockingCompany(null)} className="flex items-center gap-2 font-medium">
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
        {lockingCompany && (
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
                {lockingCompany.status === 'active'
                  ? t('companyManagement.modal.lockConfirmMsg')
                  : t('companyManagement.modal.unlockConfirmMsg')}
              </p>
            </div>
            <p className="text-sm text-content-sub pl-9">
              {lockingCompany.status === 'active'
                ? t('companyManagement.modal.lockWarning')
                : t('companyManagement.modal.unlockWarning')}
            </p>
          </div>
        )}
      </Modal>

      {/* Modal Đặt lại mật khẩu */}
      <Modal
        visible={!!resetPasswordCompany}
        onHide={() => setResetPasswordCompany(null)}
        header={t('companyManagement.modal.resetPasswordTitle')}
        className="w-[480px]"
        footer={
          <div className="flex justify-end gap-3 w-full">
            <Button variant="secondary" onClick={() => setResetPasswordCompany(null)} className="flex items-center gap-2 font-medium">
              <X size={16} weight="bold" />
              {t('companyManagement.modal.cancel')}
            </Button>
            <Button
              variant="primary"
              className="flex items-center gap-2 font-medium text-white"
              onClick={() => {
                const phone = resetPasswordCompany?.phone;
                const companyId = resetPasswordCompany?.id;
                
                if (companyId) {
                  resetPasswordMutation.mutate(companyId, {
                    onSuccess: (newPassword) => {
                      setResetPasswordCompany(null);
                      showToast({
                        title: t('companyManagement.toast.success'),
                        message: t('companyManagement.toast.resetPasswordSuccess', { password: newPassword || phone }),
                        severity: 'success',
                      });
                    }
                  });
                }
              }}
            >
              <Check size={16} weight="bold" />
              {t('companyManagement.modal.confirm')}
            </Button>
          </div>
        }
      >
        {resetPasswordCompany && (
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
              <span className="font-semibold text-content-main">{resetPasswordCompany.phone}</span>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};
