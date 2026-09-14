import React from 'react';
import type { InputTextProps as PRInputTextProps } from '@primereact/types/primitive/inputtext';
import { InputText as PRInputText } from 'primereact/inputtext';import { FormField } from '../FormField';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const inputVariants = cva(
  'flex items-stretch w-full h-10 rounded-lg overflow-hidden border transition-colors duration-200 bg-white focus-within:border-primary hover:border-primary',
  {
    variants: {
      hasError: {
        true: '!border-alert',
        false: 'border-border',
      },
      isDisabled: {
        true: 'opacity-70 bg-surface pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      hasError: false,
      isDisabled: false,
    },
  }
);

export interface InputProps
  extends Omit<PRInputTextProps, 'className' | 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  required?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  wrapperClassName?: string;
  className?: string;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
}

function Input({
  label,
  error,
  required,
  iconLeft,
  iconRight,
  clearable,
  onClear,
  className,
  wrapperClassName,
  prefixNode,
  suffixNode,
  hasError,
  isDisabled,
  ...props
}: InputProps) {
  const isError = hasError || !!error;
  const isInputDisabled = isDisabled || props.disabled;

  const inputComponent = (
    <div className={cn(inputVariants({ hasError: isError, isDisabled: isInputDisabled, className: wrapperClassName }))}>
      {prefixNode && (
        <div className="flex items-center justify-center bg-surface border-r border-border px-3 text-sm text-content-main">
          {prefixNode}
        </div>
      )}

      <div className="relative flex-1 flex items-center min-w-0">
        {iconLeft && (
          <div className={cn('absolute left-3 z-10 flex items-center justify-center text-content-hint', isError && '!text-alert')}>
            {iconLeft}
          </div>
        )}

        <PRInputText
          className={cn(
            'w-full h-full outline-none focus:outline-none focus:ring-0 px-3 flex-1 bg-transparent text-content-main placeholder:text-content-hint',
            iconLeft && '!pl-10',
            (iconRight || (clearable && props.value)) && '!pr-10',
            isInputDisabled && 'cursor-not-allowed',
            className
          )}
          disabled={isInputDisabled}
          {...props}
        />

        {(iconRight || (clearable && props.value)) && (
          <div
            className={cn(
              'absolute right-3 z-10 flex items-center justify-center text-content-hint',
              isError && '!text-alert',
              clearable && props.value && !isInputDisabled && 'cursor-pointer hover:text-content-main'
            )}
            onClick={clearable && props.value && !isInputDisabled ? onClear : undefined}
          >
            {clearable && props.value ? <span className="pi pi-times text-[10px]"></span> : iconRight}
          </div>
        )}
      </div>

      {suffixNode && (
        <div className="flex items-center justify-center bg-surface border-l border-border px-3 text-sm text-content-main">
          {suffixNode}
        </div>
      )}
    </div>
  );

  if (label || error) {
    return (
      <FormField label={label} error={error} required={required}>
        {inputComponent}
      </FormField>
    );
  }

  return inputComponent;
}

export { Input };
