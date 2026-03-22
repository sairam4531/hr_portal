import api from './api';

export interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  joiningDate: string;
  status: 'active' | 'on-leave' | 'terminated';
  userId?: string;
  createdAt: string;
}

export interface CreateEmployeePayload {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  joiningDate: string;
}

const employeeService = {
  getAll: (params?: { search?: string; department?: string; status?: string }) =>
    api.get<Employee[]>('/employees', { params }),

  getById: (id: string) =>
    api.get<Employee>(`/employees/${id}`),

  create: (data: CreateEmployeePayload) =>
    api.post<Employee>('/employees', data),

  update: (id: string, data: Partial<CreateEmployeePayload>) =>
    api.put<Employee>(`/employees/${id}`, data),

  delete: (id: string) =>
    api.delete(`/employees/${id}`),
};

export default employeeService;
