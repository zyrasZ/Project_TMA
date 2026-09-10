import React, { forwardRef } from 'react';
import { InputTextarea, InputTextareaProps } from 'primereact/inputtextarea';
import { FormField } from '../FormField';

export interface TextareaProps extends Omit<InputTextareaProps, 'pt'> {
  label?: string;
  error?: string;
  required?: boolean;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { label, error, required, wrapperClassName, className, disabled, ...rest } = props;

  return (
    <FormField label={label} required={required} error={error} className={wrapperClassName}>
      <InputTextarea
        ref={ref}
        disabled={disabled}
        pt={{
          root: {
            className: `
              w-full p-3 rounded-md border text-sm bg-white
              placeholder:text-content-hint transition-colors resize-y min-h-[100px]
              ${error ? 'border-alert focus:!border-alert' : 'border-border focus:!border-primary'}
              ${disabled ? 'opacity-60 cursor-not-allowed bg-surface' : ''}
              !outline-none !shadow-none !ring-0 text-content-main
              ${className || ''}
            `
          }
        }}
        {...rest}
      />
    </FormField>
  );
});

Textarea.displayName = 'Textarea';
