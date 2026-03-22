import api from './api';

export interface AttendanceRecord {
  _id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

export interface MarkAttendancePayload {
  employeeId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  checkIn?: string;
  checkOut?: string;
}

const attendanceService = {
  getAll: (params?: { date?: string; employeeId?: string; month?: string }) =>
    api.get<AttendanceRecord[]>('/attendance', { params }),

  getByEmployee: (employeeId: string) =>
    api.get<AttendanceRecord[]>(`/attendance/employee/${employeeId}`),

  mark: (data: MarkAttendancePayload) =>
    api.post<AttendanceRecord>('/attendance', data),

  update: (id: string, data: Partial<MarkAttendancePayload>) =>
    api.put<AttendanceRecord>(`/attendance/${id}`, data),

  getMonthlyReport: (month: string, year: string) =>
    api.get<{ month: string; present: number; absent: number; late: number }[]>(
      '/attendance/report/monthly', { params: { month, year } }
    ),
};

export default attendanceService;
