import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const badgeVariants = cva('', {
  variants: {
    variant: {
      count:
        'inline-flex items-center justify-center px-1.5 h-5 min-w-[20px] rounded-full bg-alert text-white text-[11px] font-bold',
      dot: 'w-2 h-2 rounded-full bg-alert inline-block',
    },
  },
  defaultVariants: {
    variant: 'count',
  },
});

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  count?: number;
  max?: number;
  dot?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Badge = ({
  count,
  max = 99,
  dot = false,
  className,
  children,
}: BadgeProps) => {
  const isDot = !!dot;
  const variant = isDot ? 'dot' : 'count';

  const renderBadge = () => {
    if (isDot) {
      return <span className={cn(badgeVariants({ variant }), className)}></span>;
    }

    if (count !== undefined) {
      const displayCount = count > max ? `${max}+` : count;
      return (
        <span className={cn(badgeVariants({ variant }), className)}>
          {displayCount}
        </span>
      );
    }

    return null;
  };

  if (children) {
    return (
      <div className="relative inline-flex">
        {children}
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
          {renderBadge()}
        </div>
      </div>
    );
  }

  return renderBadge();
};

Badge.displayName = 'Badge';
