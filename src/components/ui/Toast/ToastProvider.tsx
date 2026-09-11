import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
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

interface ToastItem extends CustomToastProps {
  id: string;
}

interface SnackbarItem extends CustomSnackbarProps {
  id: string;
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const showToast = useCallback((props: CustomToastProps) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...props, id }]);
    
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, [removeToast]);

  const showSnackbar = useCallback((props: CustomSnackbarProps) => {
    const id = Math.random().toString(36).substring(7);
    setSnackbars((prev) => [...prev, { ...props, id }]);
    
    setTimeout(() => {
      removeSnackbar(id);
    }, 4000);
  }, [removeSnackbar]);

  const clear = useCallback(() => {
    setToasts([]);
    setSnackbars([]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, showSnackbar, clear }}>
      {children}
      
      {/* Container for Toasts (Top Right) */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-4 pointer-events-none">
        {toasts.map((toast) => (
          <DarkToastTemplate 
            key={toast.id} 
            {...toast} 
            onClose={() => {
              removeToast(toast.id);
              toast.onClose?.();
            }} 
          />
        ))}
      </div>

      {/* Container for Snackbars (Bottom Center) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-4 pointer-events-none">
        {snackbars.map((snackbar) => (
          <LightSnackbarTemplate 
            key={snackbar.id} 
            {...snackbar} 
            onClose={() => {
              removeSnackbar(snackbar.id);
              snackbar.onClose?.();
            }}
            onAction={() => {
              snackbar.onAction?.();
              removeSnackbar(snackbar.id);
            }}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
