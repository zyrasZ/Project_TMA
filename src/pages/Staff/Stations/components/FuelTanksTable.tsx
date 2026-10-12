import { useTranslation } from 'react-i18next';
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
import { StatusBadge } from '../../../../components/ui/StatusBadge';

interface FuelTanksTableProps {
  tanks: any[];
  isLoading?: boolean;
}

export const FuelTanksTable = ({ tanks, isLoading }: FuelTanksTableProps) => {
  const { t } = useTranslation('common');

  return (
    <div className="bg-white rounded-lg border border-divide overflow-hidden">
      <div className="px-4 py-3 font-semibold text-content-main border-b border-divide bg-white">
        {t('stationManagement.fuelParams.tanksTitle')}
      </div>
      <DataTable>
        {isLoading && <DataTableLoading />}
        <DataTableTableContainer>
          <DataTableTable>
            <DataTableTHead>
              <DataTableTHeadRow>
                <DataTableTHeadCell rowSpan={2} className="w-[100px] align-middle">{t('stationManagement.fuelParams.tankTable.id')}</DataTableTHeadCell>
                <DataTableTHeadCell rowSpan={2} className="min-w-[140px] align-middle">{t('stationManagement.fuelParams.tankTable.name')}</DataTableTHeadCell>
                <DataTableTHeadCell rowSpan={2} className="min-w-[140px] align-middle">{t('stationManagement.fuelParams.tankTable.fuelType')}</DataTableTHeadCell>
                <DataTableTHeadCell rowSpan={2} className="text-center w-[140px] align-middle">{t('stationManagement.fuelParams.tankTable.connection')}</DataTableTHeadCell>
                <DataTableTHeadCell rowSpan={2} className="text-center w-[100px] align-middle">{t('stationManagement.fuelParams.tankTable.level')}</DataTableTHeadCell>
                <DataTableTHeadCell colSpan={2} className="text-center">{t('stationManagement.fuelParams.tankTable.fuel')}</DataTableTHeadCell>
                <DataTableTHeadCell colSpan={2} className="text-center">{t('stationManagement.fuelParams.tankTable.water')}</DataTableTHeadCell>
                <DataTableTHeadCell rowSpan={2} className="text-center w-[120px] align-middle">{t('stationManagement.fuelParams.tankTable.temp')}</DataTableTHeadCell>
              </DataTableTHeadRow>
              <DataTableTHeadRow>
                <DataTableTHeadCell className="text-right">{t('stationManagement.fuelParams.tankTable.liters')}</DataTableTHeadCell>
                <DataTableTHeadCell className="text-right">{t('stationManagement.fuelParams.tankTable.mm')}</DataTableTHeadCell>
                <DataTableTHeadCell className="text-right">{t('stationManagement.fuelParams.tankTable.liters')}</DataTableTHeadCell>
                <DataTableTHeadCell className="text-right">{t('stationManagement.fuelParams.tankTable.mm')}</DataTableTHeadCell>
              </DataTableTHeadRow>
            </DataTableTHead>
            <DataTableTBody>
              {tanks.length === 0 ? (
                <DataTableRow>
                  <DataTableCell colSpan={10} className="text-content-main py-4 text-center">
                    {t('stationManagement.table.empty')}
                  </DataTableCell>
                </DataTableRow>
              ) : (
                tanks.map((tank, i) => (
                  <DataTableRow key={i}>
                    <DataTableCell>{tank.id}</DataTableCell>
                    <DataTableCell className="font-semibold text-content-main">{tank.name}</DataTableCell>
                    <DataTableCell>{tank.fuelType}</DataTableCell>
                    <DataTableCell className="text-center">
                      <StatusBadge
                        color={tank.isConnected ? 'green' : 'grey'}
                        label={tank.isConnected ? t('stationManagement.fuelParams.connectedShort') : t('stationManagement.fuelParams.disconnectedShort')}
                        className="mx-auto"
                      />
                    </DataTableCell>
                    <DataTableCell className="text-center font-medium">{tank.level}</DataTableCell>
                    <DataTableCell className="text-right">{tank.fuelLiters}</DataTableCell>
                    <DataTableCell className="text-right">{tank.fuelMm}</DataTableCell>
                    <DataTableCell className="text-right">{tank.waterLiters}</DataTableCell>
                    <DataTableCell className="text-right">{tank.waterMm}</DataTableCell>
                    <DataTableCell className="text-center">{tank.temp}</DataTableCell>
                  </DataTableRow>
                ))
              )}
            </DataTableTBody>
          </DataTableTable>
        </DataTableTableContainer>
      </DataTable>
    </div>
  );
};
