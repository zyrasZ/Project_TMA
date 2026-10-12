import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/Card';
import { WifiHigh, ArrowLeft } from '@phosphor-icons/react';
import { cn } from '../../../lib/utils';
import { useGetStations, useGetStationById } from '../../../hooks/api/stations/useStations';

import { FuelPumpsTable } from './components/FuelPumpsTable';
import { FuelTanksTable } from './components/FuelTanksTable';
import { getMockDataForStation } from '../../../mocks/fuelParams.mock';

export const FuelParamsPage = () => {
  const { t } = useTranslation('common');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Lấy danh sách trạm phục vụ cho dropdown chọn trạm
  const { data: stationsData } = useGetStations();
  const stations = stationsData?.data || [];
  
  const [selectedStationId, setSelectedStationId] = useState<string | null>(id || null);

  useEffect(() => {
    if (id && id !== selectedStationId) {
      setSelectedStationId(id);
    }
  }, [id]);

  const { data: stationDetails, isLoading: isStationLoading } = useGetStationById(selectedStationId);

  // Lấy dữ liệu mẫu linh hoạt theo ID trạm đang được chọn
  const mockData = getMockDataForStation(selectedStationId);
  const isCbxNetworkConnected = mockData.isCbxNetworkConnected;
  const isCbxConnected = mockData.isCbxConnected;
  const cbxTime = '20:23 25/10';

  const finalTanks = stationDetails?.tanks && stationDetails.tanks.length > 0 
    ? stationDetails.tanks.map((t: any, i: number) => ({
        id: t.code || t.id,
        name: t.name,
        fuelType: t.fuelType,
        isConnected: t.isConnected ?? true,
        level: t.level || (40 + i * 2).toFixed(2).replace('.', ',') + '%',
        fuelLiters: t.fuelLiters || (100000 + i * 5000).toLocaleString(),
        fuelMm: t.fuelMm || (100000 + i * 5000).toLocaleString(),
        waterLiters: t.waterLiters || '0',
        waterMm: t.waterMm || '0',
        temp: t.temp || (29 + i * 0.5).toFixed(1).replace('.', ',')
      }))
    : mockData.tanks;

  const finalPumps = stationDetails?.pumps && stationDetails.pumps.length > 0 
    ? stationDetails.pumps.map((p: any, i: number) => ({
        id: p.code || p.id,
        name: p.name,
        fuelType: p.fuelType,
        isConnected: p.isConnected ?? true,
        status: p.status || '*****',
        liters: p.liters || (1000 + i * 100).toLocaleString(),
        price: p.price || '0',
        amount: p.amount || '0',
        totalLiters: p.totalLiters || '0',
        totalAmount: p.totalAmount || '0'
      }))
    : mockData.pumps;

  const stationOptions = stations.map((s: any) => ({ label: s.name, value: s.id }));

  return (
    <div className="flex flex-col gap-6 max-w-full">
      {/* Tiêu đề trang và nút quay lại */}
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => navigate('/staff/stations')} className="px-3 h-10">
          <ArrowLeft size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-[24px] font-bold text-content-main tracking-tight">
            {t('stationManagement.fuelParams.title')}
          </h1>
          <span className={cn(
            "text-[16px] font-normal",
            isCbxConnected ? "text-content-sub" : "text-red-500"
          )}>
            ({isCbxConnected ? t('stationManagement.fuelParams.connected') : t('stationManagement.fuelParams.disconnected')} {cbxTime})
          </span>
        </div>
        
        {/* Dropdown chọn trạm ở góc phải */}
        <div className="ml-auto w-[240px]">
          <Select 
            options={stationOptions}
            value={selectedStationId}
            onChange={(e) => {
              setSelectedStationId(e.value);
              navigate(`/staff/stations/${e.value}/fuel-params`);
            }}
            placeholder="Chọn trạm"
          />
        </div>
      </div>

      <Card padding="none" className="bg-white rounded-xl shadow-sm border border-divide overflow-hidden py-6">
        <CardContent className="mt-0 p-0">
          {!isCbxNetworkConnected ? (
            /* Trạng thái mất kết nối mạng */
            <div className="flex flex-col items-center justify-center py-20 bg-white mx-6 rounded-lg border border-divide">
              <div className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.05)] mb-6 relative">
                 <WifiHigh size={48} className="text-content-sub" weight="bold" />
                 <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-white">
                   ×
                 </div>
              </div>
              <p className="text-content-main font-semibold text-[16px]">
                {t('stationManagement.fuelParams.networkError')}
              </p>
            </div>
          ) : (
            /* Trạng thái hoạt động bình thường hiển thị các bảng dữ liệu */
            <div className="flex flex-col gap-6 px-6">
              {/* Bảng vòi bơm */}
              <FuelPumpsTable pumps={finalPumps} isLoading={isStationLoading} />

              {/* Bảng bồn nhiên liệu */}
              <FuelTanksTable tanks={finalTanks} isLoading={isStationLoading} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
