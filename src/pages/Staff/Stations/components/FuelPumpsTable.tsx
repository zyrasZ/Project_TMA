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

interface FuelPumpsTableProps {
  pumps: any[];
  isLoading?: boolean;
}

export const FuelPumpsTable = ({ pumps, isLoading }: FuelPumpsTableProps) => {
  const { t } = useTranslation('common');

  return (
    <div className="bg-white rounded-lg border border-divide overflow-hidden">
      <div className="px-4 py-3 font-semibold text-content-main border-b border-divide bg-white">
        {t('stationManagement.fuelParams.pumpsTitle')}
      </div>
      <DataTable>
        {isLoading && <DataTableLoading />}
        <DataTableTableContainer>
          <DataTableTable>
            <DataTableTHead>
              <DataTableTHeadRow>
                <DataTableTHeadCell className="w-[100px]">{t('stationManagement.fuelParams.pumpTable.id')}</DataTableTHeadCell>
                <DataTableTHeadCell className="min-w-[140px]">{t('stationManagement.fuelParams.pumpTable.name')}</DataTableTHeadCell>
                <DataTableTHeadCell className="min-w-[140px]">{t('stationManagement.fuelParams.pumpTable.fuelType')}</DataTableTHeadCell>
                <DataTableTHeadCell className="text-center w-[140px]">{t('stationManagement.fuelParams.pumpTable.connection')}</DataTableTHeadCell>
                <DataTableTHeadCell className="text-center w-[120px]">{t('stationManagement.fuelParams.pumpTable.status')}</DataTableTHeadCell>
                <DataTableTHeadCell className="text-right">{t('stationManagement.fuelParams.pumpTable.liters')}</DataTableTHeadCell>
                <DataTableTHeadCell className="text-right">{t('stationManagement.fuelParams.pumpTable.price')}</DataTableTHeadCell>
                <DataTableTHeadCell className="text-right">{t('stationManagement.fuelParams.pumpTable.amount')}</DataTableTHeadCell>
                <DataTableTHeadCell className="text-right bg-green-50">{t('stationManagement.fuelParams.pumpTable.totalLiters')}</DataTableTHeadCell>
                <DataTableTHeadCell className="text-right bg-orange-50">{t('stationManagement.fuelParams.pumpTable.totalAmount')}</DataTableTHeadCell>
              </DataTableTHeadRow>
            </DataTableTHead>
            <DataTableTBody>
              {pumps.length === 0 ? (
                <DataTableRow>
                  <DataTableCell colSpan={10} className="text-content-main py-4 text-center">
                    {t('stationManagement.table.empty')}
                  </DataTableCell>
                </DataTableRow>
              ) : (
                pumps.map((pump, i) => (
                  <DataTableRow key={i}>
                    <DataTableCell>{pump.id}</DataTableCell>
                    <DataTableCell className="font-semibold text-content-main">{pump.name}</DataTableCell>
                    <DataTableCell>{pump.fuelType}</DataTableCell>
                    <DataTableCell className="text-center">
                      <StatusBadge
                        color={pump.isConnected ? 'green' : 'grey'}
                        label={pump.isConnected ? t('stationManagement.fuelParams.connectedShort') : t('stationManagement.fuelParams.disconnectedShort')}
                        className="mx-auto"
                      />
                    </DataTableCell>
                    <DataTableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <div key={idx} className="w-[6px] h-[6px] rounded-[1px] bg-grey-neutral-400"></div>
                        ))}
                      </div>
                    </DataTableCell>
                    <DataTableCell className="text-right">{pump.liters}</DataTableCell>
                    <DataTableCell className="text-right">{pump.price}</DataTableCell>
                    <DataTableCell className="text-right">{pump.amount}</DataTableCell>
                    <DataTableCell className="text-right bg-green-50/60 font-semibold">{pump.totalLiters}</DataTableCell>
                    <DataTableCell className="text-right bg-orange-50/60 font-semibold">{pump.totalAmount}</DataTableCell>
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
