import { Outlet } from 'react-router-dom';
import { AdminNavbar } from './AdminNavbar';

export const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <AdminNavbar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="w-full h-full">
           <Outlet />
        </div>
      </main>
    </div>
  );
};
