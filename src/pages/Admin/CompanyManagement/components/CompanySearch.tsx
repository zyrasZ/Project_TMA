import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../components/ui/Input';
import { MagnifyingGlass } from '@phosphor-icons/react';

interface CompanySearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export const CompanySearch = ({ search, setSearch }: CompanySearchProps) => {
  const { t } = useTranslation('common');
  
  // State cục bộ để hiển thị ngay lập tức khi user gõ
  const [localSearch, setLocalSearch] = useState(search);

  // Cập nhật lại localSearch nếu props 'search' bị thay đổi từ bên ngoài (ví dụ: bấm nút Reset)
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Xử lý debounce: Chỉ gọi setSearch lên component cha sau khi user dừng gõ 500ms
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
        label={t('companyManagement.search')}
        placeholder={t('companyManagement.searchPlaceholder')}
        iconLeft={<MagnifyingGlass size={20} />}
        value={localSearch}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalSearch(e.target.value)}
      />
    </div>
  );
};
