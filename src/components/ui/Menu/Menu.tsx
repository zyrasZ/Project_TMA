'use client';

import { cn } from '../../../lib/utils';
import type {
    MenuArrowProps,
    MenuCheckboxItemIndicatorProps,
    MenuCheckboxItemProps,
    MenuGroupProps,
    MenuItemProps,
    MenuLabelProps,
    MenuListProps,
    MenuPopupProps,
    MenuPortalProps,
    MenuPositionerProps,
    MenuRadioItemGroupProps,
    MenuRadioItemIndicatorProps,
    MenuRadioItemProps,
    MenuRootProps,
    MenuSeparatorProps,
    MenuSubmenuIndicatorProps,
    MenuSubmenuProps,
    MenuSubmenuTriggerProps,
    MenuTriggerProps
} from '@primereact/types/primitive/menu';
import { Menu as PRMenu } from 'primereact/menu';

function Menu({ ...props }: MenuRootProps) {
    return <PRMenu.Root {...props} />;
}

function MenuTrigger({ ...props }: MenuTriggerProps) {
    return <PRMenu.Trigger {...props} />;
}

function MenuPortal({ ...props }: MenuPortalProps) {
    return <PRMenu.Portal {...props} />;
}

function MenuPositioner({ ...props }: MenuPositionerProps) {
    return <PRMenu.Positioner {...props} />;
}

function MenuPopup({ className, ...props }: MenuPopupProps) {
    return (
        <PRMenu.Popup
            className={cn(
                `relative bg-white dark:bg-surface-900 rounded-md border border-border dark:border-surface-700 shadow-md
                text-content-main dark:text-surface-0 min-w-max origin-(--px-transform-origin)
                transition-[opacity,scale] duration-75 ease-out will-change-transform`,
                className
            )}
            {...props}
        />
    );
}

function MenuArrow({ className, ...props }: MenuArrowProps) {
    return (
        <PRMenu.Arrow
            className={cn(
                `absolute border border-border dark:border-surface-700 bg-white dark:bg-surface-900 size-3 rounded-bl-[3px] [clip-path:polygon(0_100%,0_0,100%_100%)]
                data-[side=top]:-bottom-1.5 data-[side=top]:left-(--px-placer-arrow-x) data-[side=top]:-translate-x-1/2 data-[side=top]:-rotate-45
                data-[side=bottom]:-top-1.5 data-[side=bottom]:left-(--px-placer-arrow-x) data-[side=bottom]:-translate-x-1/2 data-[side=bottom]:rotate-135
                data-[side=left]:-right-1.5 data-[side=left]:top-(--px-placer-arrow-y) data-[side=left]:-translate-y-1/2 data-[side=left]:-rotate-135
                data-[side=right]:-left-1.5 data-[side=right]:top-(--px-placer-arrow-y) data-[side=right]:-translate-y-1/2 data-[side=right]:rotate-45`,
                className
            )}
            {...props}
        />
    );
}

function MenuList({ className, ...props }: MenuListProps) {
    return (
        <PRMenu.List
            className={cn(
                `m-0 p-1 list-none flex flex-col gap-1 outline-none
                [&:has([role=menuitemcheckbox])_[data-part=label]]:ps-8
                [&:has([role=menuitemradio])_[data-part=label]]:ps-8`,
                className
            )}
            {...props}
        />
    );
}

function MenuGroup({ ...props }: MenuGroupProps) {
    return <PRMenu.Group {...props} />;
}

function MenuLabel({ className, ...props }: MenuLabelProps) {
    return <PRMenu.Label className={cn('px-2.5 py-1 text-xs font-semibold text-content-hint dark:text-surface-400 bg-transparent', className)} {...props} />;
}

function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
    return <PRMenu.Separator className={cn('border-t border-border dark:border-surface-700', className)} {...props} />;
}

const itemClasses = `relative flex items-center gap-2 cursor-pointer select-none rounded-sm px-2.5 py-1.5 outline-none overflow-hidden
    text-sm text-content-main dark:text-surface-0
    [&>svg]:size-4! [&>svg]:shrink-0 [&>svg]:text-content-sub dark:[&>svg]:text-surface-500
    hover:bg-surface dark:hover:bg-surface-800
    hover:text-primary dark:hover:text-surface-0
    hover:[&>svg]:text-primary dark:hover:[&>svg]:text-surface-400
    data-[focused]:bg-surface dark:data-[focused]:bg-surface-800
    data-[focused]:text-primary dark:data-[focused]:text-surface-0
    data-[focused]:[&>svg]:text-primary dark:data-[focused]:[&>svg]:text-surface-400
    data-[disabled]:opacity-60 data-[disabled]:pointer-events-none`;

function MenuItem({ className, ...props }: MenuItemProps) {
    return <PRMenu.Item className={cn(itemClasses, className)} {...props} />;
}

function MenuCheckboxItem({ className, ...props }: MenuCheckboxItemProps) {
    return <PRMenu.CheckboxItem className={cn(itemClasses, className)} {...props} />;
}

function MenuRadioItemGroup({ ...props }: MenuRadioItemGroupProps) {
    return <PRMenu.RadioItemGroup {...props} />;
}

function MenuRadioItem({ className, ...props }: MenuRadioItemProps) {
    return <PRMenu.RadioItem className={cn(itemClasses, className)} {...props} />;
}

function MenuSubmenu({ ...props }: MenuSubmenuProps) {
    return <PRMenu.Submenu {...props} />;
}

function MenuSubmenuTrigger({ className, ...props }: MenuSubmenuTriggerProps) {
    return <PRMenu.SubmenuTrigger className={cn(itemClasses, className)} {...props} />;
}

function MenuSubmenuIndicator({ className, ...props }: MenuSubmenuIndicatorProps) {
    return (
        <PRMenu.SubmenuIndicator
            className={cn(
                `inline-flex items-center justify-center w-3.5 shrink-0 text-content-hint dark:text-surface-500
                [&>svg]:size-3.5!
                data-open:ms-auto data-closed:ms-auto
                transition-transform duration-200`,
                className
            )}
            {...props}
        />
    );
}

const itemIndicatorClasses = `inline-flex items-center justify-center w-3.5 shrink-0 text-content-sub dark:text-surface-400 [&>svg]:size-3.5!`;

function MenuCheckboxItemIndicator({ className, ...props }: MenuCheckboxItemIndicatorProps) {
    return <PRMenu.CheckboxItemIndicator className={cn(itemIndicatorClasses, className)} {...props} />;
}

function MenuRadioItemIndicator({ className, ...props }: MenuRadioItemIndicatorProps) {
    return <PRMenu.RadioItemIndicator className={cn(itemIndicatorClasses, className)} {...props} />;
}

export {
    Menu,
    MenuArrow,
    MenuCheckboxItem,
    MenuCheckboxItemIndicator,
    MenuGroup,
    MenuItem,
    MenuLabel,
    MenuList,
    MenuPopup,
    MenuPortal,
    MenuPositioner,
    MenuRadioItem,
    MenuRadioItemGroup,
    MenuRadioItemIndicator,
    MenuSeparator,
    MenuSubmenu,
    MenuSubmenuIndicator,
    MenuSubmenuTrigger,
    MenuTrigger
};
