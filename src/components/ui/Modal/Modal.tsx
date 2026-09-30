import { Dialog } from 'primereact/dialog';
import type { DialogRootChangeEvent } from '@primereact/types/primitive/dialog';
import { cn } from '../../../lib/utils';
import { X } from '@phosphor-icons/react';

export interface ModalProps {
  headerClassName?: string;
  contentClassName?: string;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  visible?: boolean;
  onHide?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Modal = ({ 
  className, 
  headerClassName, 
  contentClassName, 
  footer, 
  children, 
  onHide, 
  header,
  visible,
}: ModalProps) => {
  return (
    <Dialog.Root open={visible} onOpenChange={(e: DialogRootChangeEvent) => !e.value && onHide?.()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
        <Dialog.Positioner className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
          <Dialog.Popup className={cn("bg-white rounded-lg shadow-xl border border-border overflow-hidden pointer-events-auto flex flex-col", className)}>
            {/* Header */}
            {header && (
              <Dialog.Header className={cn("px-6 py-4 border-b border-border flex items-center justify-between", headerClassName)}>
                <Dialog.Title className="text-[18px] font-semibold leading-[28px] text-content-main m-0">{header}</Dialog.Title>
                <button type="button" onClick={onHide} className="text-content-sub hover:text-content-main transition-colors outline-none cursor-pointer">
                  <X size={20} weight="bold" />
                </button>
              </Dialog.Header>
            )}
            
            {/* Content */}
            <Dialog.Content className={cn("p-0 overflow-y-auto max-h-[80vh]", contentClassName)}>
              {children}
            </Dialog.Content>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-border flex justify-end">
                {footer}
              </div>
            )}
          </Dialog.Popup>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
