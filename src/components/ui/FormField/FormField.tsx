import React, { ReactNode } from 'react';

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  error,
  children,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
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
