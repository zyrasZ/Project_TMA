import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !user) {
    // Nếu chưa đăng nhập, đá văng về trang login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Nếu đã đăng nhập nhưng không có quyền (VD: user thường đòi vào trang admin)
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
        <h1>403 Forbidden</h1>
        <p>Bạn không có quyền truy cập trang này!</p>
      </div>
    );
  }

  // Nếu hợp lệ, render các trang con bên trong
  return <Outlet />;
};
