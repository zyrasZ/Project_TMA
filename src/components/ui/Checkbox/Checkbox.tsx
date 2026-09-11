import { forwardRef } from 'react';
import { Check } from '@phosphor-icons/react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const checkboxBoxVariants = cva(
  'peer w-full h-full appearance-none rounded-sm border transition-colors duration-200 outline-none flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  {
    variants: {
      checkedState: {
        'true': '!border-primary !bg-primary',
        'false': '!border-border !bg-white',
        indeterminate:
          '!border-primary !bg-primary relative after:content-[""] after:absolute after:w-2.5 after:h-0.5 after:bg-white after:rounded-[1px] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2',
      },
      isDisabled: {
        true: 'cursor-not-allowed opacity-50',
        false: 'cursor-pointer',
      },
    },
    compoundVariants: [
      {
        checkedState: true,
        isDisabled: false,
        className: 'hover:!bg-turquoise-700 hover:!border-turquoise-700',
      },
      {
        checkedState: 'indeterminate',
        isDisabled: false,
        className: 'hover:!bg-turquoise-700 hover:!border-turquoise-700',
      },
      {
        checkedState: false,
        isDisabled: false,
        className: 'hover:!border-primary',
      },
    ],
    defaultVariants: {
      checkedState: false,
      isDisabled: false,
    },
  }
);

export interface CheckboxProps {
  label?: string;
  labelClassName?: string;
  className?: string;
  checked?: boolean | 'indeterminate';
  disabled?: boolean;
  onChange?: (e: { checked: boolean }) => void;
  inputId?: string;
  name?: string;
  value?: string | number | readonly string[] | undefined;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  labelClassName,
  className,
  checked,
  disabled,
  onChange,
  inputId,
  name,
  value,
}, ref) => {
  const getCheckedState = () => {
    if (checked === true) return true;
    if (checked === false) return false;
    return 'indeterminate';
  };

  const checkedState = getCheckedState();
  const isDisabled = !!disabled;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="w-5 h-5 flex items-center justify-center relative">
        <input
          type="checkbox"
          ref={ref}
          checked={checked === true}
          disabled={isDisabled}
          onChange={(e) => onChange?.({ checked: e.target.checked })}
          id={inputId}
          name={name}
          value={value}
          className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer peer"
        />
        <div className={cn(checkboxBoxVariants({ checkedState, isDisabled }))}>
          <div className="!text-white text-xs z-10 flex items-center justify-center">
            {checked === true && <Check weight="bold" size={12} />}
          </div>
        </div>
      </div>
      {label && (
        <label
          className={cn(
            'text-body-2 text-content-main cursor-pointer select-none',
            isDisabled && 'opacity-50 cursor-not-allowed',
            labelClassName
          )}
          htmlFor={inputId}
          onClick={(e) => {
            if (isDisabled) e.preventDefault();
          }}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
