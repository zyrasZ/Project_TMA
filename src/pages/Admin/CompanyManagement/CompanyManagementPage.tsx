import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/Button';
import { Plus } from '@phosphor-icons/react';
import { useAppToast } from '../../../components/ui/Toast';

import { useGetCompanies } from '../../../hooks/api/companies/useCompanies';

import { CompanyFilters } from './components/CompanyFilters';
import { CompanyTable } from './components/CompanyTable';
import { CompanyInfoModal } from './components/CompanyInfoModal';
import { AddCompanyModal } from './components/AddCompanyModal';
import { EditCompanyModal } from './components/EditCompanyModal';
import { ToggleLockModal } from './components/ToggleLockModal';
import { ResetPasswordModal } from './components/ResetPasswordModal';
import { Paginator } from '../../../components/ui/Paginator';

export const CompanyManagementPage = () => {
  const { t } = useTranslation('common');
  const { showToast } = useAppToast();
  
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<any | null>(null);
  
  const [lockingCompany, setLockingCompany] = useState<any | null>(null);
  const [resetPasswordCompany, setResetPasswordCompany] = useState<any | null>(null);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(30);

  const { data: companiesData, isLoading } = useGetCompanies({
    search,
    status,
    first,
    rows
  });

  const companies = companiesData?.data || [];
  const totalRecords = companiesData?.total || 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-h5 text-content-main m-0 font-semibold">{t('companyManagement.title')}</h1>
        <Button 
          variant="primary" 
          className="text-white text-[14px] font-semibold leading-[20px] tracking-[0.01em]"
          onClick={() => setIsAddCompanyModalOpen(true)}
        >
          <Plus weight="bold" size={15} color="white" />
          {t('companyManagement.addCompany')}
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-border">
        {/* Filter Section */}
        <CompanyFilters 
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />
        
        {/* Table Section */}
        <CompanyTable 
          companies={companies}
          isLoading={isLoading}
          onViewInfo={setSelectedCompany}
          onEdit={setEditingCompany}
          onToggleLock={setLockingCompany}
          onResetPassword={setResetPasswordCompany}
        />
        
        {/* Pagination Section */}
        <Paginator 
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          itemName={t('companyManagement.itemName')}
          onPageChange={(e) => {
            setFirst(e.first);
            setRows(e.rows);
          }}
          className="border-t border-border"
        />
      </div>

      {/* Modals */}
      <CompanyInfoModal 
        company={selectedCompany} 
        onClose={() => setSelectedCompany(null)} 
      />
      
      <AddCompanyModal 
        isOpen={isAddCompanyModalOpen} 
        onClose={() => setIsAddCompanyModalOpen(false)}
        companies={companies}
        onSuccess={() => {
          setIsAddCompanyModalOpen(false);
          setFirst(0);
        }}
        showToast={showToast}
      />
      
      <EditCompanyModal 
        company={editingCompany}
        onClose={() => setEditingCompany(null)}
        companies={companies}
        showToast={showToast}
      />
      
      <ToggleLockModal 
        company={lockingCompany}
        onClose={() => setLockingCompany(null)}
        showToast={showToast}
      />
      
      <ResetPasswordModal 
        company={resetPasswordCompany}
        onClose={() => setResetPasswordCompany(null)}
        showToast={showToast}
      />
    </div>
  );
};

