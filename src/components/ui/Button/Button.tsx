import React, { forwardRef } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'outline'
  | 'text'
  | 'outline-soft'
  | 'secondary'
  | 'text-neutral'
  | 'link'
  | 'destructive';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-turquoise-700 active:bg-turquoise-800 disabled:bg-grey-neutral-60 disabled:text-grey-neutral-300',
  outline:
    'border border-primary text-primary hover:bg-primary hover:text-white active:bg-turquoise-700 active:text-white disabled:border-grey-neutral-80 disabled:text-grey-neutral-300 disabled:bg-transparent',
  text: 'text-primary hover:bg-turquoise-60 active:bg-turquoise-80 disabled:text-grey-neutral-300 disabled:bg-transparent',
  'outline-soft':
    'border border-turquoise-100 text-primary hover:border-primary active:border-turquoise-700 disabled:border-grey-neutral-80 disabled:text-grey-neutral-300 disabled:bg-transparent',
  secondary:
    'bg-grey-neutral-60 text-content-main hover:bg-grey-neutral-80 active:bg-primary active:text-white disabled:bg-grey-neutral-60 disabled:text-grey-neutral-300',
  'text-neutral':
    'text-content-main hover:bg-grey-neutral-60 active:text-primary disabled:text-grey-neutral-300 disabled:bg-transparent',
  link: 'text-primary hover:underline active:text-content-main p-0 disabled:text-grey-neutral-300 disabled:no-underline',
  destructive:
    'bg-alert text-white hover:bg-red-600 active:bg-red-700 disabled:bg-grey-neutral-60 disabled:text-grey-neutral-300',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-btn-3',
  md: 'px-4 py-2 text-btn-2',
  lg: 'px-6 py-3 text-btn-1',
};

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', iconOnly = false, children, ...props }, ref) => {
    let appliedSize = sizeStyles[size];
    if (variant === 'link') {
      appliedSize = '';
    } else if (iconOnly) {
      appliedSize = iconOnlySizeStyles[size];
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${appliedSize} ${className}`.trim()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
