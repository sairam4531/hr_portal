import api from './api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'it-admin' | 'hr' | 'employee';
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'it-admin' | 'hr' | 'employee';
  };
}

const authService = {
  login: (data: LoginPayload) =>
    api.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterPayload) =>
    api.post<AuthResponse>('/auth/register', data),

  getProfile: () =>
    api.get<AuthResponse['user']>('/auth/profile'),
};

export default authService;
