import React from 'react';
import { CheckCircle, Warning, Info, X } from '@phosphor-icons/react';

export type ToastSeverity = 'success' | 'error' | 'warning' | 'info';

export interface CustomToastProps {
  severity: ToastSeverity;
  title?: string;
  message: string;
  onClose?: () => void;
}

export interface CustomSnackbarProps {
  severity: ToastSeverity;
  message: string;
  actionText?: string;
  onAction?: () => void;
  onClose?: () => void;
}

const IconMap = {
  error: <Warning size={24} weight="fill" />,
  success: <CheckCircle size={24} weight="fill" />,
  warning: <Warning size={24} weight="fill" />,
  info: <Info size={24} weight="fill" />
};

// --- DARK TOAST TEMPLATE ---
const toastColorMap: Record<ToastSeverity, string> = {
  error: 'text-alert',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info'
};

export const DarkToastTemplate: React.FC<CustomToastProps> = ({ severity, title, message, onClose }) => {
  return (
    <div className="w-[360px] bg-grey-neutral-800 rounded-lg shadow-xl p-4 flex gap-4 pointer-events-auto relative">
      <div className={`shrink-0 ${toastColorMap[severity]}`}>
        {IconMap[severity]}
      </div>
      <div className="flex-1 pr-6">
        {title && <h4 className="text-white font-medium text-sm mb-1">{title}</h4>}
        <p className="text-grey-neutral-100 text-sm">{message}</p>
      </div>
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-grey-neutral-200 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};

// --- LIGHT SNACKBAR TEMPLATE ---
const snackbarColorMap: Record<ToastSeverity, { bg: string; icon: string; text: string; action: string }> = {
  error: { bg: 'bg-red-60', icon: 'text-alert', text: 'text-red-900', action: 'text-alert hover:text-red-800' },
  success: { bg: 'bg-green-60', icon: 'text-success', text: 'text-green-900', action: 'text-success hover:text-green-800' },
  warning: { bg: 'bg-yellow-60', icon: 'text-warning', text: 'text-yellow-900', action: 'text-warning hover:text-yellow-800' },
  info: { bg: 'bg-blue-60', icon: 'text-info', text: 'text-blue-900', action: 'text-info hover:text-blue-800' },
};

export const LightSnackbarTemplate: React.FC<CustomSnackbarProps> = ({ severity, message, actionText, onAction }) => {
  const colors = snackbarColorMap[severity];
  
  return (
    <div className={`w-[400px] max-w-full rounded-lg shadow-lg p-3 px-4 flex items-center justify-between gap-4 pointer-events-auto ${colors.bg}`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`shrink-0 ${colors.icon}`}>
          {IconMap[severity]}
        </div>
        <p className={`text-sm ${colors.text} truncate`}>{message}</p>
      </div>
      
      {actionText && (
        <button 
          onClick={onAction}
          className={`shrink-0 text-sm font-bold transition-colors ${colors.action}`}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
