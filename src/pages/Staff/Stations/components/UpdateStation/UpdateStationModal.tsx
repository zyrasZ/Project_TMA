import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../../../../../components/ui/Modal';
import { Button } from '../../../../../components/ui/Button';
import { ArrowRight, ArrowLeft, CircleNotch, X } from '@phosphor-icons/react';
import type { Station } from '../../../../../types/station';
import { useUpdateStation } from '../../../../../hooks/api/stations/useStations';
import { UpdateTanksTable } from './UpdateTanksTable';
import { UpdatePumpsTable } from './UpdatePumpsTable';
import { WizardProgress } from './WizardProgress';
import { UpdateStationStep1, stationStep1Schema, type StationStep1FormValues } from './UpdateStationStep1';
import { getMockDataForStation } from '../../../../../mocks/fuelParams.mock';

interface UpdateStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  station: Station | null;
}

export const UpdateStationModal = ({ isOpen, onClose, station }: UpdateStationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const { control, trigger, getValues, reset, formState: { errors } } = useForm<StationStep1FormValues>({
    resolver: zodResolver(stationStep1Schema),
    defaultValues: {
      name: '',
      type: 'store',
      province: 'hcm',
      address: ''
    }
  });

  // Trạng thái dữ liệu
  const [tanks, setTanks] = useState<any[]>([]);
  const [pumps, setPumps] = useState<any[]>([]);

  const { mutate: updateStation, isPending } = useUpdateStation();

  useEffect(() => {
    if (station && isOpen) {
      // Tự động nhận diện tỉnh thành từ địa chỉ nếu có thể
      const lowerAddress = (station.address || '').toLowerCase();
      let prov = 'hcm';
      if (lowerAddress.includes('hà nội')) prov = 'hn';
      else if (lowerAddress.includes('đà nẵng')) prov = 'dn';
      else if (lowerAddress.includes('cần thơ')) prov = 'ct';
      else if (lowerAddress.includes('hải phòng')) prov = 'hp';

      reset({
        name: station.name || '',
        address: station.address || '',
        type: station.type || 'store',
        province: prov
      });
      
      setCurrentStep(1);
      // Nạp dữ liệu bồn/vòi từ trạm nếu có, ngược lại dùng dữ liệu mẫu (mock)
      const mockData = getMockDataForStation(station.id);
      
      setTanks(station.tanks && station.tanks.length > 0 ? station.tanks : mockData.tanks.map(t => ({
        code: t.id,
        name: t.name,
        capacity: '5.000',
        fuelType: t.fuelType
      })));
      
      setPumps(station.pumps && station.pumps.length > 0 ? station.pumps : mockData.pumps.map(p => ({
        code: p.id,
        name: p.name,
        tankName: 'Bồn 1 - DO',
        fuelType: p.fuelType
      })));
    }
  }, [station, isOpen]);

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await trigger();
      if (!isValid) return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const handleSave = () => {
    if (!station) return;
    const data = getValues();
    
    updateStation(
      { 
        id: station.id, 
        name: data.name, 
        address: data.address,
        type: data.type,
        tanks,
        pumps
      },
      { onSuccess: onClose }
    );
  };

  const headerContent = (
    <span className="text-[18px] font-bold text-content-main">
      Cập nhật trạm
    </span>
  );

  return (
    <Modal
      visible={isOpen}
      onHide={onClose}
      header={headerContent}
      className="w-[90vw] max-w-[800px]"
      contentClassName="bg-white pb-6 pt-6"
      headerClassName="bg-white border-b border-divide pb-4 pt-4 px-6"
    >
      <div className="flex flex-col">
        {/* Tiến trình từng bước (Wizard) */}
        <WizardProgress currentStep={currentStep} />

        {/* Nội dung bước 1: Thông tin trạm */}
        {currentStep === 1 && (
          <UpdateStationStep1 
            station={station}
            control={control}
            errors={errors}
          />
        )}

        {/* Nội dung bước 2: Bồn bể */}
        {currentStep === 2 && (
          <UpdateTanksTable 
            tanks={tanks} 
            setTanks={setTanks} 
          />
        )}

        {/* Nội dung bước 3: Vòi bơm */}
        {currentStep === 3 && (
          <UpdatePumpsTable 
            pumps={pumps} 
            setPumps={setPumps} 
            tanks={tanks} 
          />
        )}

        {/* Các nút hành động */}
        <div className="flex items-center justify-end gap-3 mt-8 pt-6 px-6 border-t border-divide">
          {currentStep === 1 ? (
            <Button variant="secondary" onClick={onClose} className="px-6 border-none bg-gray-100 hover:bg-gray-200 text-content-main flex items-center gap-2">
              <X weight="bold" /> Hủy
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleBack} className="px-6 border-none bg-gray-100 hover:bg-gray-200 flex items-center gap-2">
              <ArrowLeft weight="bold" /> Quay về
            </Button>
          )}
          
          <Button 
            variant="primary" 
            onClick={currentStep === 3 ? handleSave : handleNext} 
            className="px-6 flex items-center gap-2"
            disabled={isPending}
          >
            {isPending && <CircleNotch size={16} className="animate-spin" />}
            {currentStep === 3 ? 'Hoàn thành' : 'Tiếp tục'} {currentStep !== 3 && <ArrowRight weight="bold" />}
          </Button>
        </div>
      </div>

    </Modal>
  );
};
