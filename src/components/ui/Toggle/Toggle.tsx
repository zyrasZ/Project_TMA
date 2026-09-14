import type { ToggleSwitchRootProps } from '@primereact/types/primitive/toggleswitch';
import { ToggleSwitchRoot, ToggleSwitchControl, ToggleSwitchHandle } from 'primereact/toggleswitch';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const toggleRootVariants = cva(
  'inline-flex relative rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-10 h-6',
  {
    variants: {
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      isDisabled: false,
    },
  }
);

export const toggleSliderVariants = cva(
  'absolute inset-0 rounded-full transition-colors duration-200 before:absolute before:top-[2px] before:left-[2px] before:w-5 before:h-5 before:bg-white before:rounded-full before:transition-transform before:duration-200',
  {
    variants: {
      isChecked: {
        true: 'bg-primary before:translate-x-4',
        false: 'bg-grey-neutral-200 before:translate-x-0',
      },
    },
    defaultVariants: {
      isChecked: false,
    },
  }
);

export interface ToggleProps extends Omit<ToggleSwitchRootProps, 'className' | 'onChange'> {
  label?: string;
  labelClassName?: string;
  className?: string;
  checked?: boolean;
  onChange?: (e: { value: boolean }) => void;
  disabled?: boolean;
  inputId?: string;
}

export const Toggle = ({
  label,
  labelClassName,
  className,
  checked = false,
  onChange,
  disabled,
  inputId,
  ...props
}: ToggleProps) => {
  const isDisabled = !!disabled;
  const isChecked = !!checked;

  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      <ToggleSwitchRoot
        checked={isChecked}
        onCheckedChange={(e: any) => onChange?.({ value: e.checked })}
        disabled={isDisabled}
        inputId={inputId}
        inputClassName="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer peer"
        className={cn(toggleRootVariants({ isDisabled }))}
      >
        <ToggleSwitchControl className={cn(toggleSliderVariants({ isChecked }))}>
          <ToggleSwitchHandle />
        </ToggleSwitchControl>
      </ToggleSwitchRoot>
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

Toggle.displayName = 'Toggle';
