import { usersMock } from '../mocks/users.mock';
import type { LoginCredentials, AuthResponse } from '../types/auth';

const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(); // Giả lập mạng
    
    // Tìm user theo email. Giả lập mọi password đều đúng nếu nhập 'password123' hoặc chỉ cần đúng email.
    // Ở đây chúng ta yêu cầu đúng password là 'password123' cho giống thật.
    const user = usersMock.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Email không tồn tại trong hệ thống.');
    }
    
    if (credentials.password !== 'password123') {
      throw new Error('Mật khẩu không đúng. Vui lòng nhập "password123".');
    }

    // Giả lập tạo token
    const token = `fake-jwt-token-for-${user.id}-${Date.now()}`;

    return {
      user,
      token,
    };
  }
};
