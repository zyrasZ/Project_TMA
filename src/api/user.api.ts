import { usersMock } from '../mocks/users.mock';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  GetUsersParams
} from '../types/user';

let users: User[] = [...usersMock];

const delay = (ms = 800) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const userApi = {
  // GET /users
  getUsers: async (
    params?: GetUsersParams
  ): Promise<User[]> => {
    await delay();
    let result = [...users];

    if (params?.search) {
      const keyword = params.search.toLowerCase();
      result = result.filter(
        user =>
          user.name.toLowerCase().includes(keyword) ||
          user.email.toLowerCase().includes(keyword)
      );
    }

    if (params?.role) {
      result = result.filter(
        user => user.role === params.role
      );
    }

    if (params?.status) {
      result = result.filter(
        user => user.status === params.status
      );
    }

    return result;
  },

  // GET /users/:id
  getUser: async (id: number): Promise<User> => {
    await delay();
    const user = users.find(user => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return { ...user };
  },

  // POST /users
  createUser: async (
    data: CreateUserRequest
  ): Promise<User> => {
    await delay();
    const newUser: User = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    users = [...users, newUser];
    return { ...newUser };
  },

  // PATCH /users/:id
  updateUser: async (
    id: number,
    data: UpdateUserRequest
  ): Promise<User> => {
    await delay();
    const index = users.findIndex(
      user => user.id === id
    );
    if (index === -1) {
      throw new Error('User not found');
    }
    const updatedUser = {
      ...users[index],
      ...data
    };
    users[index] = updatedUser;
    return { ...updatedUser };
  },

  // DELETE /users/:id
  deleteUser: async (id: number): Promise<void> => {
    await delay();
    const exists = users.some(
      user => user.id === id
    );
    if (!exists) {
      throw new Error('User not found');
    }
    users = users.filter(
      user => user.id !== id
    );
  }
};
