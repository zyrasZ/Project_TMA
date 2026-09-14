
import type { RadioButtonRootProps } from '@primereact/types/primitive/radiobutton';
import { RadioButton as PrimeRadioButton } from 'primereact/radiobutton';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const radioBoxVariants = cva(
  'peer w-full h-full appearance-none rounded-full border-2 transition-colors duration-200 outline-none flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  {
    variants: {
      isChecked: {
        true: '!border-primary !bg-white',
        false: '!border-divide !bg-white',
      },
      isDisabled: {
        true: 'cursor-not-allowed opacity-50',
        false: 'cursor-pointer',
      },
    },
    compoundVariants: [
      {
        isChecked: true,
        isDisabled: false,
        className: 'hover:!border-turquoise-700',
      },
      {
        isChecked: false,
        isDisabled: false,
        className: 'hover:!border-primary',
      },
    ],
    defaultVariants: {
      isChecked: false,
      isDisabled: false,
    },
  }
);

export const radioIconVariants = cva(
  'w-[14px] h-[14px] rounded-full transition-transform duration-200',
  {
    variants: {
      isChecked: {
        true: '!bg-primary scale-100 block',
        false: '!bg-transparent scale-0 hidden',
      },
    },
    defaultVariants: {
      isChecked: false,
    },
  }
);

export interface RadioProps extends Omit<RadioButtonRootProps, 'className' | 'onChange'> {
  label?: string;
  labelClassName?: string;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: { value: any }) => void;
  value?: any;
  name?: string;
  inputId?: string;
}

export const Radio = ({
  label,
  labelClassName,
  className,
  checked,
  disabled,
  onChange,
  value,
  name,
  inputId,
  ...props
}: RadioProps) => {
  const isChecked = !!checked;
  const isDisabled = !!disabled;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <PrimeRadioButton.Root
        checked={isChecked}
        disabled={isDisabled}
        onCheckedChange={(e: any) => onChange?.({ value: e.value })}
        value={value}
        name={name}
        inputClassName="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer peer"
        className="w-6 h-6 flex items-center justify-center relative"
        {...props}
      >
        <PrimeRadioButton.Box className={cn(radioBoxVariants({ isChecked, isDisabled }))}>
          <PrimeRadioButton.Indicator className={cn(radioIconVariants({ isChecked }))} />
        </PrimeRadioButton.Box>
      </PrimeRadioButton.Root>
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
};

Radio.displayName = 'Radio';
