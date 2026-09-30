import { forwardRef } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { ButtonVariant, ButtonSize, buttonVariants } from '../Button';
import { cn } from '../../../lib/utils';
import { Menu, MenuTrigger, MenuPortal, MenuPositioner, MenuPopup, MenuArrow, MenuList, MenuItem } from '../Menu';

export interface DropdownMenuItem {
  label: string;
  icon?: string;
  command?: (e: any) => void;
}

export interface DropdownButtonProps {
  label: string;
  items: DropdownMenuItem[];
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export const DropdownButton = forwardRef<HTMLDivElement, DropdownButtonProps>(({
  label,
  items,
  variant = 'secondary',
  size = 'md',
  className,
}, ref) => {
  return (
    <div className={cn('relative inline-block', className)} ref={ref}>
      <Menu>
        <MenuTrigger 
          className={cn(buttonVariants({ variant, size }), "flex items-center gap-3 !px-4 cursor-pointer")}
        >
          <span>{label}</span>
          <div className="w-[1px] h-4 bg-current opacity-30 mx-1"></div>
          <CaretDown size={16} weight="bold" />
        </MenuTrigger>
        <MenuPortal>
          <MenuPositioner>
            <MenuPopup>
              <MenuArrow />
              <MenuList>
                {items.map((item, i) => (
                  <MenuItem 
                    key={i} 
                    onSelect={(e: any) => item.command ? item.command({ originalEvent: e, item }) : undefined}
                  >
                    {item.icon && <span className={item.icon}></span>}
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </div>
  );
});

DropdownButton.displayName = 'DropdownButton';
