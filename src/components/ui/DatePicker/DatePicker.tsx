import React from 'react';
import { FormField } from '../FormField';
import { CalendarBlank } from '@phosphor-icons/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const datePickerVariants = cva(
  'w-full h-10 rounded-lg outline-none transition-colors duration-200 border bg-white flex items-center relative overflow-hidden',
  {
    variants: {
      hasError: {
        true: '!border-alert',
        false: 'border-border hover:border-primary focus-within:!border-primary',
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

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>,
    VariantProps<typeof datePickerVariants> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const DatePicker = ({
  label,
  error,
  required,
  wrapperClassName,
  className,
  hasError,
  isDisabled,
  ref,
  ...props
}: DatePickerProps) => {
  const isError = hasError || !!error;
  const isInputDisabled = isDisabled || props.disabled;

  const datePickerComponent = (
    <div className={cn(datePickerVariants({ hasError: isError, isDisabled: isInputDisabled, className }))}>
      <input
        type="date"
        ref={ref as any}
        className="w-full h-full px-3 outline-none bg-transparent text-sm text-content-main placeholder:text-content-hint appearance-none cursor-pointer"
        disabled={isInputDisabled}
        {...props}
      />
      <div className="absolute right-3 pointer-events-none text-content-hint">
        <CalendarBlank size={16} />
      </div>
    </div>
  );

  if (label || error) {
    return (
      <FormField label={label} error={error} required={required} className={wrapperClassName}>
        {datePickerComponent}
      </FormField>
    );
  }

  return <div className={cn('w-full', wrapperClassName)}>{datePickerComponent}</div>;
};

DatePicker.displayName = 'DatePicker';
