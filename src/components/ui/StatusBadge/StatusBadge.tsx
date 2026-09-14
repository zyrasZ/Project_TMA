import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Tag as PrimeTag } from 'primereact/tag';
import type { ComponentProps } from 'react';
export const statusBadgeVariants = cva('inline-flex items-center gap-2', {
  variants: {},
});

export const statusBadgeIconVariants = cva('block w-2.5 h-2.5', {
  variants: {
    color: {
      blue: 'bg-info',
      green: 'bg-success',
      orange: 'bg-orange-500',
      red: 'bg-alert',
      yellow: 'bg-warning',
      grey: 'bg-content-hint',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-[2px]',
    },
  },
  defaultVariants: {
    color: 'grey',
    shape: 'circle',
  },
});

export interface StatusBadgeProps
  extends Omit<ComponentProps<typeof PrimeTag>, 'className' | 'value'>,
    VariantProps<typeof statusBadgeIconVariants> {
  label: string;
  className?: string;
}

export const StatusBadge = ({
  color,
  shape,
  label,
  className,
  ...props
}: StatusBadgeProps) => {
  return (
    <PrimeTag className={cn(statusBadgeVariants(), className)} {...props}>
      <span className={cn(statusBadgeIconVariants({ color, shape }))}></span>
      <span className="text-sm font-medium text-content-main">{label}</span>
    </PrimeTag>
  );
};

StatusBadge.displayName = 'StatusBadge';
