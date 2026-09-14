import type { AvatarRootProps } from '@primereact/types/primitive/avatar';
import { Avatar as PrimeAvatar } from 'primereact/avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

export const avatarVariants = cva(
  'inline-flex items-center justify-center bg-surface-main text-content-main border border-border overflow-hidden relative',
  {
    variants: {
      size: {
        normal: 'w-8 h-8 text-sm',
        large: 'w-10 h-10 text-base',
        xlarge: 'w-12 h-12 text-lg',
      },
      shape: {
        square: 'rounded-md',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'normal',
      shape: 'circle',
    },
  }
);

export interface AvatarProps extends Omit<AvatarRootProps, 'className' | 'size' | 'shape'>, VariantProps<typeof avatarVariants> {
  image?: string;
  imageAlt?: string;
  icon?: string;
  label?: string;
  className?: string;
}

export const Avatar = ({
  size = 'normal',
  shape = 'circle',
  image,
  imageAlt,
  icon,
  label,
  className,
  ...props
}: AvatarProps) => {
  return (
    <PrimeAvatar.Root
      className={cn(avatarVariants({ size, shape }), className)}
      {...props}
    >
      {image ? (
        <PrimeAvatar.Image src={image} alt={imageAlt} className="w-full h-full object-cover" />
      ) : (
        <PrimeAvatar.Fallback className="flex items-center justify-center w-full h-full">
          {icon ? <span className={cn(icon, 'text-content-sub text-[1.2em]')} /> : <span className="font-medium">{label}</span>}
        </PrimeAvatar.Fallback>
      )}
    </PrimeAvatar.Root>
  );
};

Avatar.displayName = 'Avatar';
