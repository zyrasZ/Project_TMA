export type UserRole = 'admin' | 'manager' | 'user';
export type UserStatus = 'active' | 'inactive';
export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: UserRole;
  status: UserStatus;
  avatar: string;
  createdAt: string;
}
export interface CreateUserRequest {
  name: string;
  email: string;
  age: number;
  role: UserRole;
  status: UserStatus;
  avatar: string;
}
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  age?: number;
  role?: UserRole;
  status?: UserStatus;
}

export interface GetUsersParams {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
}
