import type { User } from '../types/user';

export const usersMock: User[] = [
  {
    id: 1,
    name: 'Nguyen Van An',
    email: 'an@gmail.com',
    age: 25,
    role: 'admin',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 2,
    name: 'Tran Thi Binh',
    email: 'binh@gmail.com',
    age: 28,
    role: 'user',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: '2026-09-02T08:00:00Z'
  },
  {
    id: 3,
    name: 'Le Van Cuong',
    email: 'cuong@gmail.com',
    age: 31,
    role: 'manager',
    status: 'inactive',
    avatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: '2026-09-03T08:00:00Z'
  },
  {
    id: 4,
    name: 'Pham Thi Dung',
    email: 'dung@gmail.com',
    age: 24,
    role: 'user',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=4',
    createdAt: '2026-09-04T08:00:00Z'
  },
  {
    id: 5,
    name: 'Hoang Van Em',
    email: 'em@gmail.com',
    age: 29,
    role: 'user',
    status: 'inactive',
    avatar: 'https://i.pravatar.cc/150?img=5',
    createdAt: '2026-09-05T08:00:00Z'
  }
];