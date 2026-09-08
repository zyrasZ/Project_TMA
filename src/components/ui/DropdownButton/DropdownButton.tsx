import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { CaretDown } from '@phosphor-icons/react';
import { Button, ButtonVariant, ButtonSize } from '../Button';

export interface DropdownButtonProps {
  label: string;
  items: MenuItem[];
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  items,
  variant = 'secondary',
  size = 'md',
  className = '',
}) => {
  const menuLeft = useRef<Menu>(null);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    menuLeft.current?.toggle(event);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <Button
        variant={variant}
        size={size}
        onClick={toggleMenu}
        aria-controls="popup_menu"
        aria-haspopup
        className="flex items-center gap-3 !px-4"
      >
        <span>{label}</span>
        <div className="w-[1px] h-4 bg-current opacity-30 mx-1"></div>
        <CaretDown size={16} weight="bold" />
      </Button>

      <Menu
        model={items}
        popup
        ref={menuLeft}
        id="popup_menu"
        appendTo="self"
        pt={{
          root: {
            className:
              'bg-white py-2 border border-divide rounded-lg shadow-lg !w-max min-w-[200px] max-w-[320px] !mt-1 !top-full !left-0 !transform-none z-50',
          },
          menu: { className: 'm-0 p-0 list-none outline-none' },
          menuitem: { className: 'm-0' },
          content: () => ({
            className: `
              flex items-center gap-3 px-4 py-2.5 text-content-main transition-colors
              !bg-transparent hover:!bg-grey-neutral-40 overflow-hidden
            `,
          }),
          label: { className: 'text-body-2 font-medium truncate flex-1' },
          icon: { className: 'text-content-sub text-lg shrink-0' },
        }}
      />
    </div>
  );
};
