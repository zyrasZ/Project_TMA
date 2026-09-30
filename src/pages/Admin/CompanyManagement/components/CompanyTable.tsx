import { useTranslation } from 'react-i18next';
import { Avatar } from '../../../../components/ui/Avatar';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import { DropdownButton } from '../../../../components/ui/DropdownButton';
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
} from '../../../../components/ui/DataTable';

interface CompanyTableProps {
  companies: any[];
  isLoading: boolean;
  onViewInfo: (company: any) => void;
  onEdit: (company: any) => void;
  onToggleLock: (company: any) => void;
  onResetPassword: (company: any) => void;
}

export const CompanyTable = ({
  companies,
  isLoading,
  onViewInfo,
  onEdit,
  onToggleLock,
  onResetPassword
}: CompanyTableProps) => {
  const { t } = useTranslation('common');

  return (
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
            {companies.length === 0 ? (
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
              companies.map((company) => (
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
                        { label: t('companyManagement.table.viewInfo'), icon: 'pi pi-info-circle', command: () => onViewInfo(company) },
                        { label: t('companyManagement.table.updateInfo'), icon: 'pi pi-pencil', command: () => onEdit(company) },
                        { label: company.status === 'active' ? t('companyManagement.table.lockCompany') : t('companyManagement.table.unlockCompany'), icon: company.status === 'active' ? 'pi pi-lock' : 'pi pi-lock-open', command: () => onToggleLock(company) },
                        { label: t('companyManagement.table.resetPassword'), icon: 'pi pi-key', command: () => onResetPassword(company) },
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
    </DataTable>
  );
};
