import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Khôi phục trạng thái từ localStorage nếu có
const token = localStorage.getItem('token');
const userStr = localStorage.getItem('user');

const initialState: AuthState = {
  user: userStr ? JSON.parse(userStr) : null,
  token: token ? token : null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
