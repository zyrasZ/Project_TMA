import { CompanySearch } from './CompanySearch';
import { CompanyStatusFilter } from './CompanyStatusFilter';

interface CompanyFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  status: string | null;
  setStatus: (value: string | null) => void;
}

export const CompanyFilters = ({ search, setSearch, status, setStatus }: CompanyFiltersProps) => {
  return (
    <div className="flex flex-col">
      {/* Row 1: Tìm kiếm */}
      <div className="p-4 border-b border-border">
        <CompanySearch search={search} setSearch={setSearch} />
      </div>

      {/* Row 2: Trạng thái & Đặt lại */}
      <div className="p-4 flex">
        <CompanyStatusFilter 
          status={status} 
          setStatus={setStatus} 
          onReset={() => {
            setSearch('');
            setStatus(null);
          }} 
        />
      </div>
    </div>
  );
};
