import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../api/auth.api';
import { setCredentials } from '../../../store/slices/authSlice';
import type { LoginCredentials } from '../../../types/auth';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data: any) => {
      // Lưu vào Redux store
      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
        })
      );
      
      // Chuyển hướng dựa trên role
      if (data.user.role === 'admin') {
        navigate('/admin/companies');
      } else {
        navigate('/app');
      }
    },
  });
};
