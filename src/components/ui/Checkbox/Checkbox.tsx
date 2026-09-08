import React from 'react';
import { Checkbox as PRCheckbox, CheckboxProps as PRCheckboxProps } from 'primereact/checkbox';
import { Check } from '@phosphor-icons/react';

export interface CheckboxProps extends Omit<PRCheckboxProps, 'pt'> {
  label?: string;
  labelClassName?: string;
}

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ label, labelClassName = '', className = '', ...props }, ref) => {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <PRCheckbox
          ref={ref as any}
          icon={<Check weight="bold" size={12} />}
          {...props}
          pt={{
            root: { className: 'w-5 h-5 flex items-center justify-center' },
            box: {
              className: `
                peer w-full h-full appearance-none rounded-sm border transition-colors duration-200 outline-none flex items-center justify-center
                focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                ${props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                ${
                  props.checked
                    ? `!border-primary !bg-primary ${
                        !props.disabled ? 'hover:!bg-turquoise-700 hover:!border-turquoise-700' : ''
                      }`
                    : props.checked === undefined
                    ? `!border-primary !bg-primary relative after:content-[''] after:absolute after:w-2.5 after:h-0.5 after:bg-white after:rounded-[1px] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 ${
                        !props.disabled ? 'hover:!bg-turquoise-700 hover:!border-turquoise-700' : ''
                      }`
                    : `!border-border !bg-white ${!props.disabled ? 'hover:!border-primary' : ''}`
                }
              `,
            },
            icon: {
              className: `!text-white text-xs z-10`,
            },
          }}
        />
        {label && (
          <label
            className={`text-body-2 text-content-main cursor-pointer select-none ${
              props.disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${labelClassName}`}
            htmlFor={props.inputId}
            onClick={(e) => {
              if (props.disabled) e.preventDefault();
            }}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
