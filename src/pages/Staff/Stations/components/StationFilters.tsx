import { StationSearch } from './StationSearch';
import { StationSelectFilters } from './StationSelectFilters';

interface StationFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  province: string | null;
  setProvince: (value: string | null) => void;
  type: string | null;
  setType: (value: string | null) => void;
  status: string | null;
  setStatus: (value: string | null) => void;
}

export const StationFilters = ({
  search,
  setSearch,
  province,
  setProvince,
  type,
  setType,
  status,
  setStatus
}: StationFiltersProps) => {
  return (
    <div className="flex flex-col">
      <div className="p-6 border-b border-divide bg-white">
        <StationSearch search={search} setSearch={setSearch} />
      </div>
      <div className="p-6 flex bg-white border-b border-divide">
        <StationSelectFilters 
          province={province}
          setProvince={setProvince}
          type={type}
          setType={setType}
          status={status}
          setStatus={setStatus}
          onReset={() => {
            setSearch('');
            setProvince(null);
            setType(null);
            setStatus(null);
          }} 
        />
      </div>
    </div>
  );
};
