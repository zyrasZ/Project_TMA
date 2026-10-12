import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StationFilters } from './components/StationFilters';
import { StationTable } from './components/StationTable';
import { UpdateStationModal } from './components/UpdateStation/UpdateStationModal';
import { Paginator } from '../../../components/ui/Paginator';
import { Card, CardContent, CardFooter } from '../../../components/ui/Card';
import { useGetStations } from '../../../hooks/api/stations/useStations';

export const StationManagementPage = () => {
  const { t } = useTranslation('common');
  
  const [search, setSearch] = useState('');
  const [province, setProvince] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(30);

  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { data: stationsData, isLoading } = useGetStations({
    search,
    province,
    type,
    status,
    first,
    rows
  });

  const stations = stationsData?.data || [];
  const totalRecords = stationsData?.total || 0;

  const handlePageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="flex flex-col gap-6 max-w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] font-bold text-content-main tracking-tight">
          {t('stationManagement.title')}
        </h1>
      </div>

      <Card padding="none" className="bg-white rounded-xl shadow-sm border border-divide overflow-hidden flex flex-col gap-0">
        <CardContent className="mt-0 p-0 text-inherit">
          <StationFilters 
            search={search}
            setSearch={setSearch}
            province={province}
            setProvince={setProvince}
            type={type}
            setType={setType}
            status={status}
            setStatus={setStatus}
          />
          
          <div className="bg-white">
            <StationTable 
              stations={stations} 
              isLoading={isLoading} 
              onEdit={(station) => {
                setSelectedStation(station);
                setIsUpdateModalOpen(true);
              }}
            />
          </div>
        </CardContent>
        
        <CardFooter className="mt-0 p-4 border-t border-divide bg-white block w-full">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            itemName={t('stationManagement.itemName')}
            rowsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={handlePageChange}
            className="w-full [&_.p-paginator-current]:mr-auto"
          />
        </CardFooter>
      </Card>
      
      <UpdateStationModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedStation(null);
        }}
        station={selectedStation}
      />
    </div>
  );
};
