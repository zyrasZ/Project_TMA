
import { AppRouter } from './router';
import { ToastProvider } from '../components/ui/Toast';

export const App = () => {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-surface-main font-sans">
        <AppRouter />
      </div>
    </ToastProvider>
  );
};
