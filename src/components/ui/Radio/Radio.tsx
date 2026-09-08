import React from 'react';
import { RadioButton as PRRadioButton, RadioButtonProps as PRRadioButtonProps } from 'primereact/radiobutton';

export interface RadioProps extends Omit<PRRadioButtonProps, 'pt'> {
  label?: string;
  labelClassName?: string;
}

export const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
  ({ label, labelClassName = '', className = '', ...props }, ref) => {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <PRRadioButton
          ref={ref as any}
          {...props}
          pt={{
            root: { className: 'w-6 h-6 flex items-center justify-center relative' },
            box: {
              className: `
                peer w-full h-full appearance-none rounded-full border-2 transition-colors duration-200 outline-none flex items-center justify-center
                focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                ${props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                ${
                  props.checked
                    ? `!border-primary !bg-white ${!props.disabled ? 'hover:!border-turquoise-700' : ''}`
                    : `!border-divide !bg-white ${!props.disabled ? 'hover:!border-primary' : ''}`
                }
              `,
            },
            icon: {
              className: `w-[14px] h-[14px] rounded-full transition-transform duration-200 
                ${props.checked ? '!bg-primary scale-100 block' : '!bg-transparent scale-0 hidden'}
              `,
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

Radio.displayName = 'Radio';
