import api from "./api";

const dashboardService = {
  getStats: () => api.get("/dashboard/stats"),

  getAttendanceChart: () => api.get("/dashboard/attendance-chart"),

  getDepartmentChart: () => api.get("/dashboard/department-chart")
};

export default dashboardService;