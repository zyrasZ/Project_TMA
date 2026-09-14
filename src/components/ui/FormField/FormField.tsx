import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { ReactNode } from 'react';

export const formFieldVariants = cva('flex flex-col gap-1.5 w-full');

export interface FormFieldProps extends VariantProps<typeof formFieldVariants> {
  label?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

export const FormField = ({
  label,
  required,
  error,
  children,
  className,
}: FormFieldProps) => {
  return (
    <div className={cn(formFieldVariants(), className)}>
      {label && (
        <label className="text-sm font-medium text-content-main flex items-center gap-1">
          {label}
          {required && <span className="text-alert">*</span>}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-alert">{error}</span>}
    </div>
  );
};

FormField.displayName = 'FormField';
