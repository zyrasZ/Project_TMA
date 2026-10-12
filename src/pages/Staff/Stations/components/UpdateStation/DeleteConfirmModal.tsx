import { Modal } from '../../../../../components/ui/Modal';
import { Button } from '../../../../../components/ui/Button';
import { Warning, X, Check } from '@phosphor-icons/react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, description }: DeleteConfirmModalProps) => {
  return (
    <Modal
      visible={isOpen}
      onHide={onClose}
      header={<span className="text-[18px] font-bold">{title}</span>}
      className="w-[90vw] max-w-[500px]"
    >
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 p-6 pb-20">
          <div className="flex items-center gap-2">
            <Warning size={24} className="text-red-500 flex-shrink-0" weight="regular" />
            <h4 className="text-[16px] font-semibold text-content-main">
              Bạn có chắc muốn xóa {title.toLowerCase().replace('xóa ', '')} này không?
            </h4>
          </div>
          <p className="text-[14px] text-content-main mt-1">
            {description}
          </p>
        </div>
        
        <div className="flex items-center justify-end gap-3 p-4 border-t border-divide">
          <Button variant="secondary" onClick={onClose} className="px-6 border-none bg-surface hover:bg-gray-200 text-content-main flex items-center gap-2">
            <X weight="bold" /> Hủy
          </Button>
          <Button 
            variant="primary" 
            className="px-6 flex items-center gap-2 border-none"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            <Check weight="bold" /> Xác nhận
          </Button>
        </div>
      </div>
    </Modal>
  );
};
