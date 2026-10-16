import React, { useState, useRef, useEffect } from 'react';
import { X, XCircle, CaretDown } from '@phosphor-icons/react';
import { FormField } from '../FormField';
import { cn } from '../../../lib/utils';
import type { MultiSelectProps } from './types';
import { MultiSelectDropdown } from './MultiSelectDropdown';

export const MultiSelect = ({
  label,
  error,
  required,
  options = [],
  value = [],
  onChange,
  placeholder = 'Chọn...',
  disabled = false,
  className,
  wrapperClassName,
  maxSelectedLabels = 3,
  showSelectAll = false,
  selectAllLabel = 'Chọn tất cả',
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const selected = Array.isArray(value) ? value : [];
  const selectable = options.filter((o) => o.value !== 'all');
  const allValues = selectable.map((o) => o.value);
  const isAllSelected = selectable.length > 0 && allValues.every((v) => selected.includes(v));

  const toggle = (val: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange?.({
      value: selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val],
    });
  };

  const selectedOpts = selectable.filter((o) => selected.includes(o.value));
  const chips = selectedOpts.slice(0, maxSelectedLabels);
  const extra = selectedOpts.length - maxSelectedLabels;

  const content = (
    <div ref={containerRef} className="relative w-full">
      <div
        role="combobox"
        aria-expanded={isOpen}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={cn(
          'w-full min-h-10 rounded-lg border bg-white px-3 py-1.5 flex items-center justify-between cursor-pointer transition-colors outline-none',
          error ? '!border-alert' : 'border-border hover:border-primary focus-within:border-primary',
          disabled && 'bg-[#EAEBEB] cursor-not-allowed pointer-events-none',
          isOpen && !error && 'border-primary ring-1 ring-primary/20',
          className
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0 pr-2">
          {selectedOpts.length === 0 ? (
            <span className="text-sm text-content-hint select-none">{placeholder}</span>
          ) : (
            <>
              {chips.map((opt) => (
                <span
                  key={opt.value}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F0F1F3] border border-[#E2E4E8] text-xs text-content-main select-none"
                >
                  <span className="truncate max-w-[200px]">{opt.label}</span>
                  <X
                    size={11}
                    weight="bold"
                    onClick={(e) => toggle(opt.value, e)}
                    className="text-gray-400 hover:text-content-main cursor-pointer"
                  />
                </span>
              ))}
              {extra > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F0F1F3] border border-[#E2E4E8] text-xs font-medium text-content-main select-none">
                  +{extra}
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 text-content-hint">
          {selected.length > 0 && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.({ value: [] });
              }}
              className="text-gray-400 hover:text-content-main cursor-pointer inline-flex items-center justify-center"
              title="Xóa tất cả"
              aria-label="Xóa tất cả"
            >
              <XCircle size={16} />
            </button>
          )}
          <CaretDown
            size={14}
            className={cn('text-gray-400 transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </div>
      </div>

      {isOpen && (
        <MultiSelectDropdown
          options={selectable}
          selectedValues={selected}
          onToggle={toggle}
          showSelectAll={showSelectAll}
          selectAllLabel={selectAllLabel}
          isAllSelected={isAllSelected}
          onToggleSelectAll={(e) => {
            e.stopPropagation();
            onChange?.({ value: isAllSelected ? [] : allValues });
          }}
        />
      )}
    </div>
  );

  return label || error ? (
    <FormField label={label} error={error} required={required} className={wrapperClassName}>
      {content}
    </FormField>
  ) : (
    <div className={cn('w-full', wrapperClassName)}>{content}</div>
  );
};

MultiSelect.displayName = 'MultiSelect';
