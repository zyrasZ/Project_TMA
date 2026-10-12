import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../../components/ui/Button';
import { PencilSimple, Trash, Plus } from '@phosphor-icons/react';
import { PumpFormModal } from './PumpFormModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import {
  DataTable,
  DataTableHeader,
  DataTableTableContainer,
  DataTableTable,
  DataTableTHead,
  DataTableTHeadRow,
  DataTableTHeadCell,
  DataTableTBody,
  DataTableRow,
  DataTableCell
} from '../../../../../components/ui/DataTable';

interface UpdatePumpsTableProps {
  pumps: any[];
  setPumps: (pumps: any[]) => void;
  tanks: any[];
}

export const UpdatePumpsTable = ({ pumps, setPumps, tanks }: UpdatePumpsTableProps) => {
  const { t } = useTranslation('common');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pumpToEdit, setPumpToEdit] = useState<any>(null);
  const [indexToEdit, setIndexToEdit] = useState<number | null>(null);
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null);

  return (
    <div className="flex flex-col px-6">
      <div className="border border-divide rounded-lg overflow-hidden bg-white">
        <DataTable>
          <DataTableHeader className="flex items-center justify-between p-4 border-b border-divide bg-white">
            <h3 className="font-semibold text-[15px] text-content-main">
              {t('stationManagement.updateStation.pumps.title')}
            </h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setPumpToEdit(null);
                setIndexToEdit(null);
                setIsFormOpen(true);
              }}
            >
              <Plus weight="bold" size={14} /> {t('stationManagement.updateStation.pumps.add')}
            </Button>
          </DataTableHeader>
          <DataTableTableContainer>
            <DataTableTable>
              <DataTableTHead>
                <DataTableTHeadRow>
                  <DataTableTHeadCell className="w-[100px]">{t('stationManagement.fuelParams.pumpTable.id')}</DataTableTHeadCell>
                  <DataTableTHeadCell className="min-w-[140px]">{t('stationManagement.updateStation.pumps.pumpName')}</DataTableTHeadCell>
                  <DataTableTHeadCell>{t('stationManagement.updateStation.pumps.fromTank')}</DataTableTHeadCell>
                  <DataTableTHeadCell>{t('stationManagement.fuelParams.pumpTable.fuelType')}</DataTableTHeadCell>
                  <DataTableTHeadCell className="text-center w-[120px]">{t('stationManagement.table.actions')}</DataTableTHeadCell>
                </DataTableTHeadRow>
              </DataTableTHead>
              <DataTableTBody>
                {pumps.length === 0 ? (
                  <DataTableRow>
                    <DataTableCell colSpan={5} className="py-8 text-center text-content-hint">
                      {t('stationManagement.updateStation.pumps.empty')}
                    </DataTableCell>
                  </DataTableRow>
                ) : (
                  pumps.map((pump, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell>{pump.code}</DataTableCell>
                      <DataTableCell className="font-semibold text-content-main">{pump.name}</DataTableCell>
                      <DataTableCell>{pump.tankName}</DataTableCell>
                      <DataTableCell>{pump.fuelType}</DataTableCell>
                      <DataTableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="text"
                            size="sm"
                            iconOnly
                            title={t('stationManagement.updateStation.actions.edit')}
                            className="text-primary hover:text-primary/80"
                            onClick={() => {
                              setPumpToEdit(pump);
                              setIndexToEdit(i);
                              setIsFormOpen(true);
                            }}
                          >
                            <PencilSimple size={18} />
                          </Button>
                          <Button
                            variant="text"
                            size="sm"
                            iconOnly
                            title={t('stationManagement.updateStation.actions.delete')}
                            className="text-primary hover:text-primary/80"
                            onClick={() => setIndexToDelete(i)}
                          >
                            <Trash size={18} />
                          </Button>
                        </div>
                      </DataTableCell>
                    </DataTableRow>
                  ))
                )}
              </DataTableTBody>
            </DataTableTable>
          </DataTableTableContainer>
        </DataTable>
      </div>

      <PumpFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        initialData={pumpToEdit}
        onSave={(pump) => {
          if (indexToEdit !== null) {
            const newPumps = [...pumps];
            newPumps[indexToEdit] = pump;
            setPumps(newPumps);
          } else {
            setPumps([...pumps, pump]);
          }
        }} 
        tanks={tanks} 
      />

      <DeleteConfirmModal
        isOpen={indexToDelete !== null}
        onClose={() => setIndexToDelete(null)}
        title={t('stationManagement.updateStation.pumps.deleteTitle')}
        description={t('stationManagement.updateStation.pumps.deleteDesc')}
        onConfirm={() => {
          if (indexToDelete !== null) {
            setPumps(pumps.filter((_, idx) => idx !== indexToDelete));
          }
        }}
      />
    </div>
  );
};
