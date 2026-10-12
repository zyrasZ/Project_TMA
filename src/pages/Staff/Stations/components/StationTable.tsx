import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

interface StationTableProps {
  stations: any[];
  isLoading: boolean;
  onEdit?: (station: any) => void;
}

export const StationTable = ({ stations, isLoading, onEdit }: StationTableProps) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  return (
    <DataTable>
      {isLoading && <DataTableLoading />}
      <DataTableTableContainer>
        <DataTableTable>
          <DataTableTHead>
            <DataTableTHeadRow>
              <DataTableTHeadCell className="w-[100px]">{t('stationManagement.table.id')}</DataTableTHeadCell>
              <DataTableTHeadCell className="min-w-[200px]">{t('stationManagement.table.name')}</DataTableTHeadCell>
              <DataTableTHeadCell className="min-w-[250px]">{t('stationManagement.table.address')}</DataTableTHeadCell>
              <DataTableTHeadCell>{t('stationManagement.table.type')}</DataTableTHeadCell>
              <DataTableTHeadCell>{t('stationManagement.table.expireDate')}</DataTableTHeadCell>
              <DataTableTHeadCell>{t('stationManagement.table.status')}</DataTableTHeadCell>
              <DataTableTHeadCell className="w-[200px]">{t('stationManagement.table.actions')}</DataTableTHeadCell>
            </DataTableTHeadRow>
          </DataTableTHead>
          <DataTableTBody>
            {stations.length === 0 ? (
              <DataTableRow>
                <DataTableCell colSpan={7} className="text-content-main py-4 text-center">
                  {t('stationManagement.table.empty')}
                </DataTableCell>
              </DataTableRow>
            ) : (
              stations.map((station, index) => (
                <DataTableRow key={index}>
                  <DataTableCell>{station.id}</DataTableCell>
                  <DataTableCell>
                    <span className="font-semibold text-content-main">{station.name}</span>
                  </DataTableCell>
                  <DataTableCell>{station.address}</DataTableCell>
                  <DataTableCell>{t('stationManagement.stationTypeStore')}</DataTableCell>
                  <DataTableCell>{station.expireDate}</DataTableCell>
                  <DataTableCell>
                    <StatusBadge 
                      color={station.status === 'active' ? 'green' : 'orange'}
                      label={station.status === 'active' ? t('stationManagement.statusActive') : t('stationManagement.statusExpired')}
                    />
                  </DataTableCell>
                  <DataTableCell>
                    <DropdownButton 
                      label={t('stationManagement.actions.fuelParams')}
                      size="sm"
                      variant="secondary"
                      items={[
                        { 
                          label: t('stationManagement.actions.viewInfo'), 
                          icon: 'pi pi-info-circle', 
                          command: () => navigate(`/staff/stations/${station.id}/fuel-params`) 
                        },
                        { label: t('stationManagement.actions.updateInfo'), icon: 'pi pi-pencil', command: () => onEdit?.(station) },
                        { label: t('stationManagement.actions.exportInvoice'), icon: 'pi pi-file', command: () => {} },
                        { label: t('stationManagement.actions.dataIntegration'), icon: 'pi pi-database', command: () => {} },
                      ]} 
                      className="w-full whitespace-nowrap [&>button]:w-full [&>button]:justify-between [&>button]:bg-grey-primary-50 [&>button]:border-transparent [&>button>span:first-child]:w-full [&>button>span:first-child]:text-left"
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
