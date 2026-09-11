import React, { useState } from 'react';
import { Select as PrimeSelect } from 'primereact/select';
import { FormField } from '../FormField';
import { CaretDown, Check } from '@phosphor-icons/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const selectVariants = cva(
  'w-full h-10 rounded-lg outline-none transition-colors duration-200 border bg-white flex items-center relative',
  {
    variants: {
      hasError: {
        true: '!border-alert',
        false: 'border-border focus-within:!border-primary hover:border-primary',
      },
      isDisabled: {
        true: 'bg-surface cursor-not-allowed opacity-70 pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      hasError: false,
      isDisabled: false,
    },
  }
);

export interface SelectOption {
  label: string;
  value: any;
}

export interface SelectProps extends VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
  required?: boolean;
  options: SelectOption[];
  value?: any;
  onChange?: (e: { value: any }) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  multiple?: boolean;
  ref?: React.Ref<any>;
}

export const Select = ({
  label,
  error,
  required,
  options,
  value,
  onChange,
  disabled,
  placeholder,
  className,
  wrapperClassName,
  multiple,
  hasError,
  isDisabled,
  ref,
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState<any>(value || (multiple ? [] : null));

  const handleChange = (e: any) => {
    setInternalValue(e.value);
    onChange?.({ value: e.value });
  };

  const isError = hasError || !!error;
  const isSelectDisabled = isDisabled || disabled;

  const selectComponent = (
    <PrimeSelect.Root
      value={internalValue !== undefined ? internalValue : value}
      onValueChange={handleChange}
      disabled={isSelectDisabled}
      className={cn(selectVariants({ hasError: isError, isDisabled: isSelectDisabled, className }))}
    >
      <PrimeSelect.Trigger className="w-full h-full flex items-center justify-between px-3 cursor-pointer outline-none">
        <PrimeSelect.Value className="text-sm text-content-main truncate" placeholder={placeholder} />
        <CaretDown size={16} className={cn('text-content-hint', isError && 'text-alert')} />
      </PrimeSelect.Trigger>

      <PrimeSelect.Portal>
        <PrimeSelect.Positioner>
          <PrimeSelect.Popup className="bg-white rounded-lg shadow-lg border border-border mt-1 z-50 overflow-hidden min-w-[200px] outline-none">
            <PrimeSelect.List className="max-h-60 overflow-auto py-1 flex flex-col outline-none">
              {options.map((opt, i) => (
                <PrimeSelect.Option
                  key={opt.value ?? i}
                  value={opt.value}
                  className="px-3 py-2 cursor-pointer flex items-center justify-between mx-1 mb-1 rounded-md transition-colors text-sm text-content-main hover:bg-surface data-[selected]:bg-primary/10 data-[selected]:text-primary data-[selected]:font-medium outline-none"
                >
                  <span>{opt.label}</span>
                  <PrimeSelect.OptionIndicator>
                    <Check size={16} weight="bold" />
                  </PrimeSelect.OptionIndicator>
                </PrimeSelect.Option>
              ))}
            </PrimeSelect.List>
          </PrimeSelect.Popup>
        </PrimeSelect.Positioner>
      </PrimeSelect.Portal>
    </PrimeSelect.Root>
  );

  if (label || error) {
    return (
      <FormField label={label} error={error} required={required} className={wrapperClassName}>
        {selectComponent}
      </FormField>
    );
  }

  return <div className={cn('w-full', wrapperClassName)} ref={ref as any}>{selectComponent}</div>;
};

Select.displayName = 'Select';
