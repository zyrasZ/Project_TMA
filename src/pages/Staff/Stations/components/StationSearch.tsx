import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../components/ui/Input';
import { MagnifyingGlass } from '@phosphor-icons/react';

interface StationSearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export const StationSearch = ({ search, setSearch }: StationSearchProps) => {
  const { t } = useTranslation('common');
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search !== localSearch) {
        setSearch(localSearch);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearch, search, setSearch]);

  return (
    <div className="w-full md:w-[320px]">
      <Input 
        label={t('stationManagement.search')}
        placeholder={t('stationManagement.searchPlaceholder')}
        iconLeft={<MagnifyingGlass size={20} />}
        value={localSearch}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalSearch(e.target.value)}
      />
    </div>
  );
};
