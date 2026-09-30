import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { AdminLayout } from '../components/layout/admin/AdminLayout';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';
import { LandingPage } from '../pages/Landing/LandingPage';
import { UsersPage } from '../pages/Users/UsersPage';
import { LoginPage } from '../pages/Login/LoginPage';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { CompanyManagementPage } from '../pages/Admin/CompanyManagement/CompanyManagementPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes (chỉ cần đăng nhập) */}
        <Route path="/app" element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            
            {/* Manager Routes */}
            <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
              <Route path="users" element={<UsersPage />} />
            </Route>
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/companies" replace />} />
            <Route path="companies" element={<CompanyManagementPage />} />
          </Route>
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
