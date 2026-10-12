import { useTranslation } from 'react-i18next';
import { Select } from '../../../../components/ui/Select';
import { Button } from '../../../../components/ui/Button';
import { ArrowsClockwise } from '@phosphor-icons/react';

interface StationSelectFiltersProps {
  province: string | null;
  setProvince: (value: string | null) => void;
  type: string | null;
  setType: (value: string | null) => void;
  status: string | null;
  setStatus: (value: string | null) => void;
  onReset: () => void;
}

export const StationSelectFilters = ({
  province,
  setProvince,
  type,
  setType,
  status,
  setStatus,
  onReset
}: StationSelectFiltersProps) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-end w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        <Select 
          label={t('stationManagement.province')}
          placeholder={t('stationManagement.provincePlaceholder')}
          options={[
            { label: 'Hồ Chí Minh', value: 'HCM' },
            { label: 'Hà Nội', value: 'HN' },
            { label: 'Đà Nẵng', value: 'DN' },
            { label: 'Cần Thơ', value: 'CT' }
          ]}
          value={province}
          onChange={(e) => setProvince(e.value)}
        />
        <Select 
          label={t('stationManagement.type')}
          placeholder={t('stationManagement.typePlaceholder')}
          options={[
            { label: t('stationManagement.stationTypeStore'), value: 'store' },
            { label: 'Đại lý', value: 'agency' },
            { label: 'Trạm nội bộ', value: 'internal' }
          ]}
          value={type}
          onChange={(e) => setType(e.value)}
        />
        <Select 
          label={t('stationManagement.status')}
          placeholder={t('stationManagement.statusPlaceholder')}
          options={[
            { label: t('stationManagement.statusActive'), value: 'active' },
            { label: t('stationManagement.statusExpired'), value: 'expired' }
          ]}
          value={status}
          onChange={(e) => setStatus(e.value)}
        />
      </div>

      <Button 
        variant="secondary" 
        className="flex items-center gap-2 font-medium mt-4 md:mt-0 whitespace-nowrap"
        onClick={onReset}
      >
        <ArrowsClockwise weight="bold" size={16} />
        {t('stationManagement.resetFilter')}
      </Button>
    </div>
  );
};
