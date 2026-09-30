import { useTranslation } from 'react-i18next';
import { Select } from '../../../../components/ui/Select';
import { Button } from '../../../../components/ui/Button';
import { ArrowsClockwise } from '@phosphor-icons/react';

interface CompanyStatusFilterProps {
  status: string | null;
  setStatus: (value: string | null) => void;
  onReset: () => void;
}

export const CompanyStatusFilter = ({ status, setStatus, onReset }: CompanyStatusFilterProps) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col md:flex-row justify-between items-end w-full">
      <div className="w-full md:w-[320px]">
        <Select 
          label={t('companyManagement.status')}
          placeholder={t('companyManagement.statusPlaceholder')}
          options={[
            { label: t('companyManagement.statusAll'), value: 'all' },
            { label: t('companyManagement.statusActive'), value: 'active' },
            { label: t('companyManagement.statusInactive'), value: 'inactive' }
          ]}
          value={status}
          onChange={(e) => setStatus(e.value)}
        />
      </div>

      <Button 
        variant="secondary" 
        className="flex items-center gap-2 font-medium mt-4 md:mt-0"
        onClick={onReset}
      >
        <ArrowsClockwise weight="bold" size={16} />
        {t('companyManagement.resetFilter')}
      </Button>
    </div>
  );
};
