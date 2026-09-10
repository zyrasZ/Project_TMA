import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { Toast } from 'primereact/toast';
import { CustomToastProps, CustomSnackbarProps, DarkToastTemplate, LightSnackbarTemplate } from './ToastTemplates';

interface ToastContextType {
  showToast: (props: CustomToastProps) => void;
  showSnackbar: (props: CustomSnackbarProps) => void;
  clear: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useAppToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useAppToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const toastTopRight = useRef<Toast>(null);
  const toastBottomCenter = useRef<Toast>(null);

  const showToast = (props: CustomToastProps) => {
    toastTopRight.current?.show({
      severity: props.severity,
      life: 3000,
      content: (options) => (
        <DarkToastTemplate 
          {...props} 
          onClose={() => {
            options.onClose();
            props.onClose?.();
          }} 
        />
      ),
    });
  };

  const showSnackbar = (props: CustomSnackbarProps) => {
    toastBottomCenter.current?.show({
      severity: props.severity,
      life: 4000,
      content: (options) => (
        <LightSnackbarTemplate 
          {...props} 
          onClose={() => {
            options.onClose();
            props.onClose?.();
          }} 
        />
      ),
    });
  };

  const clear = () => {
    toastTopRight.current?.clear();
    toastBottomCenter.current?.clear();
  };

  // Loại bỏ các class mặc định của PrimeReact để dùng 100% style của Template
  const basePT = {
    message: { className: '!bg-transparent !border-0 !p-0 !shadow-none mb-4' },
    content: { className: '!p-0' },
    icon: { className: 'hidden' },
    button: { className: 'hidden' }, // Ẩn nút close mặc định
  };

  return (
    <ToastContext.Provider value={{ showToast, showSnackbar, clear }}>
      {children}
      <Toast ref={toastTopRight} position="top-right" pt={basePT} />
      <Toast ref={toastBottomCenter} position="bottom-center" pt={basePT} />
    </ToastContext.Provider>
  );
};
