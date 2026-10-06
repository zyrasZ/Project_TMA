import { Outlet } from 'react-router-dom';
import { StaffNavbar } from './StaffNavbar';

export const StaffLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <StaffNavbar />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};
