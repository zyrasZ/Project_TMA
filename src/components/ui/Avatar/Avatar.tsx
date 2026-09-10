import React, { forwardRef } from 'react';
import { Avatar as PrimeAvatar, AvatarProps as PrimeAvatarProps } from 'primereact/avatar';

export interface AvatarProps extends Omit<PrimeAvatarProps, 'pt'> {
  size?: 'normal' | 'large' | 'xlarge';
  shape?: 'square' | 'circle';
  src?: string;
  icon?: string;
  label?: string;
  className?: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { size = 'normal', shape = 'circle', className, ...rest } = props;

  return (
    <PrimeAvatar
      // @ts-ignore - PrimeReact ref type might be slightly different
      ref={ref}
      size={size}
      shape={shape}
      pt={{
        root: {
          className: `
            inline-flex items-center justify-center bg-surface-main text-content-main
            border border-border overflow-hidden
            ${className || ''}
          `
        },
        image: { className: 'w-full h-full object-cover' },
        icon: { className: 'text-content-sub' }
      }}
      {...rest}
    />
  );
});

Avatar.displayName = 'Avatar';
