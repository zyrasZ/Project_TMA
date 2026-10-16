import { InvoiceConfigSearch } from './InvoiceConfigSearch';

interface InvoiceConfigFiltersProps {
  search: string;
  setSearch: (value: string) => void;
}

export const InvoiceConfigFilters = ({ search, setSearch }: InvoiceConfigFiltersProps) => {
  return (
    <div className="p-6 border-b border-divide bg-white">
      <InvoiceConfigSearch search={search} setSearch={setSearch} />
    </div>
  );
};
