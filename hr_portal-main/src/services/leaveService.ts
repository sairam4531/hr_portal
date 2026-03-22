import api from './api';

export interface LeaveRequest {
  _id: string;
  employeeId: string;
  employeeName: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface ApplyLeavePayload {
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
}

const leaveService = {
  getAll: (params?: { status?: string; employeeId?: string }) =>
    api.get<LeaveRequest[]>('/leaves', { params }),

  getMyLeaves: () =>
    api.get<LeaveRequest[]>('/leaves/my'),

  apply: (data: ApplyLeavePayload) =>
    api.post<LeaveRequest>('/leaves', data),

  approve: (id: string) =>
    api.patch<LeaveRequest>(`/leaves/${id}/approve`),

  reject: (id: string) =>
    api.patch<LeaveRequest>(`/leaves/${id}/reject`),
};

export default leaveService;
