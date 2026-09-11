import { forwardRef } from 'react';

import { FormField } from '../FormField';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const textareaVariants = cva(
  'w-full p-3 rounded-lg border text-sm bg-white placeholder:text-content-hint transition-colors resize-y min-h-[100px] outline-none shadow-none ring-0 text-content-main',
  {
    variants: {
      hasError: {
        true: 'border-alert focus:border-alert',
        false: 'border-border focus:border-primary',
      },
      isDisabled: {
        true: 'opacity-70 cursor-not-allowed bg-surface pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      hasError: false,
      isDisabled: false,
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  required?: boolean;
  wrapperClassName?: string;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  required,
  wrapperClassName,
  className,
  hasError,
  isDisabled,
  ...props
}, ref) => {
  const isError = hasError || !!error;
  const isInputDisabled = isDisabled || props.disabled;

  const textareaComponent = (
    <textarea
      ref={ref}
      disabled={isInputDisabled}
      className={cn(textareaVariants({ hasError: isError, isDisabled: isInputDisabled, className }))}
      {...props}
    />
  );

  if (label || error) {
    return (
      <FormField label={label} required={required} error={error} className={wrapperClassName}>
        {textareaComponent}
      </FormField>
    );
  }

  return textareaComponent;
});

Textarea.displayName = 'Textarea';
