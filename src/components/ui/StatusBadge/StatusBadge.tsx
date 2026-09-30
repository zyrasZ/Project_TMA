import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Tag as PrimeTag } from 'primereact/tag';
import type { ComponentProps } from 'react';
export const statusBadgeVariants = cva('inline-flex items-center justify-center h-6 gap-1.5 px-2.5 rounded-full border text-xs font-medium w-fit', {
  variants: {
    color: {
      blue: 'bg-blue-60 border-blue-200 text-blue-700',
      green: 'bg-green-60 border-green-200 text-content-main',
      orange: 'bg-orange-60 border-orange-200 text-orange-700',
      red: 'bg-red-60 border-red-200 text-red-700',
      yellow: 'bg-yellow-60 border-yellow-200 text-yellow-700',
      grey: 'bg-grey-neutral-60 border-grey-neutral-200 text-content-main',
    }
  },
  defaultVariants: {
    color: 'grey'
  }
});

export const statusBadgeIconVariants = cva('block w-2 h-2', {
  variants: {
    color: {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      orange: 'bg-orange-600',
      red: 'bg-red-600',
      yellow: 'bg-yellow-600',
      grey: 'bg-grey-neutral-400',
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
    <PrimeTag className={cn(statusBadgeVariants({ color }), className)} {...props}>
      <span className={cn(statusBadgeIconVariants({ color, shape }))}></span>
      <span>{label}</span>
    </PrimeTag>
  );
};

StatusBadge.displayName = 'StatusBadge';
