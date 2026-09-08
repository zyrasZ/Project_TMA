import React from 'react';
import { InputSwitch, InputSwitchProps } from 'primereact/inputswitch';

export interface ToggleProps extends Omit<InputSwitchProps, 'pt'> {
  label?: string;
  labelClassName?: string;
}

export const Toggle = React.forwardRef<HTMLDivElement, ToggleProps>(
  ({ label, labelClassName = '', className = '', ...props }, ref) => {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <InputSwitch
          ref={ref as any}
          {...props}
          pt={{
            root: {
              className: `
                !w-10 !h-6 inline-flex relative rounded-full cursor-pointer outline-none
                focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `,
            },
            slider: {
              className: `
                !absolute !inset-0 !rounded-full transition-colors duration-200
                before:!absolute before:!top-[2px] before:!left-[2px] before:!w-5 before:!h-5 before:!bg-white before:!rounded-full before:!transition-transform before:!duration-200 before:!mt-0
                ${
                  props.checked
                    ? '!bg-primary before:!translate-x-4'
                    : '!bg-grey-neutral-200 before:!translate-x-0'
                }
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

Toggle.displayName = 'Toggle';
