import React, { forwardRef } from 'react';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { FormField } from '../FormField';

export interface InputProps extends Omit<InputTextProps, 'pt' | 'size'> {
  label?: string;
  error?: string;
  required?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  wrapperClassName?: string;
  prefixNode?: React.ReactNode; // Khối nền xám bên trái (Input Group)
  suffixNode?: React.ReactNode; // Khối nền xám bên phải (Input Group)
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, error, required, 
    iconLeft, iconRight, clearable, onClear, 
    className = '', wrapperClassName = '', 
    prefixNode, suffixNode,
    ...props 
  }, ref) => {
    
    // Group wrapper: Quản lý border và focus cho cả cụm (khi có prefix/suffix)
    const groupClasses = `
      flex items-stretch w-full h-10 rounded-lg overflow-hidden border transition-colors duration-200 bg-white
      ${error ? '!border-alert' : 'border-border'}
      ${!props.disabled ? 'focus-within:border-primary hover:border-primary' : ''}
      ${props.disabled ? 'opacity-70 bg-surface' : ''}
    `;

    // Ô Input thật sự: Bỏ viền để ăn theo viền của Group
    const baseInputClasses = `
      w-full h-full outline-none focus:outline-none focus:ring-0 px-3 flex-1
      bg-transparent text-content-main placeholder:text-content-hint
      ${props.disabled ? 'cursor-not-allowed' : ''}
    `;

    const paddingLeft = iconLeft ? '!pl-10' : '';
    const paddingRight = (iconRight || (clearable && props.value)) ? '!pr-10' : '';

    const inputComponent = (
      <div className={`${groupClasses} ${wrapperClassName}`}>
        {prefixNode && (
          <div className="flex items-center justify-center bg-surface border-r border-border px-3 text-sm text-content-main">
            {prefixNode}
          </div>
        )}
        
        <div className="relative flex-1 flex items-center min-w-0">
          {iconLeft && (
            <div className={`absolute left-3 z-10 flex items-center justify-center text-content-hint ${error ? '!text-alert' : ''}`}>
              {iconLeft}
            </div>
          )}
          
          <InputText
            ref={ref}
            className={`${baseInputClasses} ${paddingLeft} ${paddingRight} ${className}`.trim()}
            {...props}
            pt={{ root: { className: 'border-none !shadow-none' } }}
          />

          {(iconRight || (clearable && props.value)) && (
            <div 
              className={`absolute right-3 z-10 flex items-center justify-center text-content-hint ${error ? '!text-alert' : ''} ${clearable && props.value && !props.disabled ? 'cursor-pointer hover:text-content-main' : ''}`}
              onClick={clearable && props.value && !props.disabled ? onClear : undefined}
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
);

Input.displayName = 'Input';
