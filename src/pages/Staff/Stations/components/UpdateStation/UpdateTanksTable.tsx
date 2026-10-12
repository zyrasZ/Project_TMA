import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../../components/ui/Button';
import { PencilSimple, Trash, Plus } from '@phosphor-icons/react';
import { TankFormModal } from './TankFormModal';
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

interface UpdateTanksTableProps {
  tanks: any[];
  setTanks: (tanks: any[]) => void;
}

export const UpdateTanksTable = ({ tanks, setTanks }: UpdateTanksTableProps) => {
  const { t } = useTranslation('common');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tankToEdit, setTankToEdit] = useState<any>(null);
  const [indexToEdit, setIndexToEdit] = useState<number | null>(null);
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null);

  return (
    <div className="flex flex-col px-6">
      <div className="border border-divide rounded-lg overflow-hidden bg-white">
        <DataTable>
          <DataTableHeader className="flex items-center justify-between p-4 border-b border-divide bg-white">
            <h3 className="font-semibold text-[15px] text-content-main">
              {t('stationManagement.updateStation.tanks.title')}
            </h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setTankToEdit(null);
                setIndexToEdit(null);
                setIsFormOpen(true);
              }}
            >
              <Plus weight="bold" size={14} /> {t('stationManagement.updateStation.tanks.add')}
            </Button>
          </DataTableHeader>
          <DataTableTableContainer>
            <DataTableTable>
              <DataTableTHead>
                <DataTableTHeadRow>
                  <DataTableTHeadCell className="w-[100px]">{t('stationManagement.fuelParams.tankTable.id')}</DataTableTHeadCell>
                  <DataTableTHeadCell className="min-w-[140px]">{t('stationManagement.fuelParams.tankTable.name')}</DataTableTHeadCell>
                  <DataTableTHeadCell>{t('stationManagement.updateStation.tanks.capacity')}</DataTableTHeadCell>
                  <DataTableTHeadCell>{t('stationManagement.fuelParams.tankTable.fuelType')}</DataTableTHeadCell>
                  <DataTableTHeadCell className="text-center w-[120px]">{t('stationManagement.table.actions')}</DataTableTHeadCell>
                </DataTableTHeadRow>
              </DataTableTHead>
              <DataTableTBody>
                {tanks.length === 0 ? (
                  <DataTableRow>
                    <DataTableCell colSpan={5} className="py-8 text-center text-content-hint">
                      {t('stationManagement.updateStation.tanks.empty')}
                    </DataTableCell>
                  </DataTableRow>
                ) : (
                  tanks.map((tank, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell>{tank.code}</DataTableCell>
                      <DataTableCell className="font-semibold text-content-main">{tank.name}</DataTableCell>
                      <DataTableCell>{tank.capacity}</DataTableCell>
                      <DataTableCell>{tank.fuelType}</DataTableCell>
                      <DataTableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="text"
                            size="sm"
                            iconOnly
                            title={t('stationManagement.updateStation.actions.edit')}
                            className="text-primary hover:text-primary/80"
                            onClick={() => {
                              setTankToEdit(tank);
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

      <TankFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        initialData={tankToEdit}
        onSave={(tank) => {
          if (indexToEdit !== null) {
            const newTanks = [...tanks];
            newTanks[indexToEdit] = tank;
            setTanks(newTanks);
          } else {
            setTanks([...tanks, tank]);
          }
        }} 
      />

      <DeleteConfirmModal
        isOpen={indexToDelete !== null}
        onClose={() => setIndexToDelete(null)}
        title={t('stationManagement.updateStation.tanks.deleteTitle')}
        description={t('stationManagement.updateStation.tanks.deleteDesc')}
        onConfirm={() => {
          if (indexToDelete !== null) {
            setTanks(tanks.filter((_, idx) => idx !== indexToDelete));
          }
        }}
      />
    </div>
  );
};
