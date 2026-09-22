import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';
import { LandingPage } from '../pages/Landing/LandingPage';
import { UsersPage } from '../pages/Users/UsersPage';
import { LoginPage } from '../pages/Login/LoginPage';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';

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
            
            {/* Admin/Manager Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'manager']} />}>
              <Route path="users" element={<UsersPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
