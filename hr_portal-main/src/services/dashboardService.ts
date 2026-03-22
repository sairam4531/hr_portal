import api from './api';

export interface DashboardStats {
  totalEmployees: number;
  totalHRs: number;
  activeEmployees: number;
  onLeave: number;
  openPositions: number;
  pendingLeaves: number;
  attendanceRate: number;
  payrollTotal: number;
  avgPerformance: number;
}

const dashboardService = {
  getStats: () =>
    api.get<DashboardStats>('/dashboard/stats'),

  getAttendanceChart: () =>
    api.get<{ month: string; present: number; absent: number }[]>('/dashboard/attendance-chart'),

  getDepartmentChart: () =>
    api.get<{ name: string; value: number }[]>('/dashboard/department-chart'),
};

export default dashboardService;
