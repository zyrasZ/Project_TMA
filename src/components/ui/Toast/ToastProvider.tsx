import React, { createContext, useContext, ReactNode } from 'react';
import { CustomToastProps, CustomSnackbarProps } from './ToastTemplates';
import { toast, Toaster } from './Toast';

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
  const showToast = (props: CustomToastProps) => {
    const toastProps = {
      title: props.title,
      description: props.message,
      duration: 3000
    };
    
    if (props.severity === 'success') {
      toast.success(toastProps);
    } else if (props.severity === 'error') {
      toast.error(toastProps);
    } else if (props.severity === 'warning') {
      toast.warn(toastProps);
    } else {
      toast.info(toastProps);
    }
  };

  const showSnackbar = (props: CustomSnackbarProps) => {
    toast.info({ 
      description: props.message, 
      ...(props.actionText ? { action: { children: props.actionText } as React.ButtonHTMLAttributes<HTMLButtonElement> } : {}),
      duration: 4000 
    });
  };

  const clear = () => {
    toast.dismiss();
  };

  return (
    <ToastContext.Provider value={{ showToast, showSnackbar, clear }}>
      {children}
      <Toaster position="top-right" />
    </ToastContext.Provider>
  );
};
