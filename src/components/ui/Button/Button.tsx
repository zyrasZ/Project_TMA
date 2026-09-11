import React, { forwardRef } from 'react';
import { Button as PRButton } from 'primereact/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-turquoise-700 active:bg-turquoise-800 disabled:bg-grey-neutral-60 disabled:text-grey-neutral-300',
        outline: 'border border-primary text-primary hover:bg-primary hover:text-white active:bg-turquoise-700 active:text-white disabled:border-grey-neutral-80 disabled:text-grey-neutral-300 disabled:bg-transparent',
        text: 'text-primary hover:bg-turquoise-60 active:bg-turquoise-80 disabled:text-grey-neutral-300 disabled:bg-transparent',
        'outline-soft': 'border border-turquoise-100 text-primary hover:border-primary active:border-turquoise-700 disabled:border-grey-neutral-80 disabled:text-grey-neutral-300 disabled:bg-transparent',
        secondary: 'bg-grey-neutral-60 text-content-main hover:bg-grey-neutral-80 active:bg-primary active:text-white disabled:bg-grey-neutral-60 disabled:text-grey-neutral-300',
        'text-neutral': 'text-content-main hover:bg-grey-neutral-60 active:text-primary disabled:text-grey-neutral-300 disabled:bg-transparent',
        link: 'text-primary hover:underline active:text-content-main p-0 disabled:text-grey-neutral-300 disabled:no-underline',
        destructive: 'bg-alert text-white hover:bg-red-600 active:bg-red-700 disabled:bg-grey-neutral-60 disabled:text-grey-neutral-300',
      },
      size: {
        sm: 'px-3 py-1.5 text-btn-3',
        md: 'px-4 py-2 text-btn-2',
        lg: 'px-6 py-3 text-btn-1',
      },
      iconOnly: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        iconOnly: true,
        size: 'sm',
        className: 'w-8 h-8 px-0 py-0',
      },
      {
        iconOnly: true,
        size: 'md',
        className: 'w-10 h-10 px-0 py-0',
      },
      {
        iconOnly: true,
        size: 'lg',
        className: 'w-12 h-12 px-0 py-0',
      },
      {
        variant: 'link',
        className: 'px-0 py-0',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconOnly: false,
    },
  }
);

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant,
  size,
  iconOnly,
  ...props
}, ref) => {
  return (
    <PRButton
      ref={ref}
      className={cn(buttonVariants({ variant, size, iconOnly, className }))}
      {...props}
    />
  );
});

Button.displayName = 'Button';
