import React from 'react';
import { Check } from '@phosphor-icons/react';
import { cn } from '../../../lib/utils';
import type { MultiSelectOption } from './types';

interface MultiSelectDropdownProps {
  options: MultiSelectOption[];
  selectedValues: string[];
  onToggle: (val: string, e?: React.MouseEvent) => void;
  showSelectAll?: boolean;
  selectAllLabel?: string;
  isAllSelected: boolean;
  onToggleSelectAll: (e: React.MouseEvent) => void;
}

const CheckboxBox = ({ checked }: { checked: boolean }) => (
  <div
    className={cn(
      'w-4 h-4 rounded-[3px] border flex items-center justify-center flex-shrink-0 transition-colors',
      checked ? 'bg-primary border-primary text-white' : 'border-[#CBD5E1] bg-white'
    )}
  >
    {checked && <Check size={12} weight="bold" />}
  </div>
);

export const MultiSelectDropdown = ({
  options,
  selectedValues,
  onToggle,
  showSelectAll,
  selectAllLabel = 'Chọn tất cả',
  isAllSelected,
  onToggleSelectAll,
}: MultiSelectDropdownProps) => (
  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-border z-50 overflow-hidden">
    <div className="max-h-64 overflow-y-auto py-1 flex flex-col">
      {showSelectAll && (
        <div
          onClick={onToggleSelectAll}
          className="px-4 py-2.5 cursor-pointer flex items-center justify-between text-sm text-content-main hover:bg-[#F8FAFC] border-b border-border/40 font-medium"
        >
          <span>{selectAllLabel}</span>
          <CheckboxBox checked={isAllSelected} />
        </div>
      )}
      {options.map((opt) => (
        <div
          key={opt.value}
          onClick={(e) => onToggle(opt.value, e)}
          className="px-4 py-2.5 cursor-pointer flex items-center justify-between text-sm text-content-main hover:bg-[#F8FAFC]"
        >
          <span className="truncate pr-3">{opt.label}</span>
          <CheckboxBox checked={selectedValues.includes(opt.value)} />
        </div>
      ))}
    </div>
  </div>
);
