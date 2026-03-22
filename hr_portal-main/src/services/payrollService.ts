import api from './api';

export interface PayrollRecord {
  _id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  bonus: number;
  tax: number;
  netSalary: number;
  status: 'processed' | 'pending';
  createdAt: string;
}

export interface GeneratePayrollPayload {
  employeeId: string;
  month: string;
  basicSalary: number;
  allowances?: number;
  deductions?: number;
  bonus?: number;
  tax?: number;
}

const payrollService = {
  getAll: (params?: { month?: string; status?: string }) =>
    api.get<PayrollRecord[]>('/payroll', { params }),

  getByEmployee: (employeeId: string) =>
    api.get<PayrollRecord[]>(`/payroll/employee/${employeeId}`),

  generate: (data: GeneratePayrollPayload) =>
    api.post<PayrollRecord>('/payroll', data),

  getMyPayslips: () =>
    api.get<PayrollRecord[]>('/payroll/my'),
};

export default payrollService;
