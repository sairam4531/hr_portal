import api from './api';

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  department?: string;
  role?: string;
  position?: string;
  salary?: number;
  joiningDate?: string;
}

export interface UserRecord {
  _id: string;
  name: string;
  email: string;
  role: 'it-admin' | 'hr' | 'employee';
  phone?: string;
  department?: string;
  position?: string;
  salary?: number;
  joiningDate?: string;
  isActive: boolean;
  createdAt: string;
}

const userService = {
  createHR: (data: CreateUserPayload) =>
    api.post<UserRecord>('/users/create-hr', data),

  createEmployee: (data: CreateUserPayload) =>
    api.post<UserRecord>('/users/create-employee', data),

  getAllHRs: () =>
    api.get<UserRecord[]>('/users/hrs'),

  getAllEmployees: () =>
    api.get<UserRecord[]>('/users/employees'),

  getUserById: (id: string) =>
    api.get<UserRecord>(`/users/${id}`),

  updateUser: (id: string, data: Partial<CreateUserPayload>) =>
    api.put<UserRecord>(`/users/${id}`, data),

  deleteUser: (id: string) =>
    api.delete(`/users/${id}`),

  toggleActive: (id: string) =>
    api.patch<UserRecord>(`/users/${id}/toggle-active`),
};

export default userService;
