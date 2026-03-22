import api from "./api";

const attendanceService = {
  getAll: (params) => api.get("/attendance", { params }),

  getByEmployee: (employeeId) => api.get(`/attendance/employee/${employeeId}`),

  mark: (data) => api.post("/attendance", data),

  update: (id, data) => api.put(`/attendance/${id}`, data),

  getMonthlyReport: (month, year) =>
  api.get("/attendance/report/monthly", { params: { month, year } })
};

export default attendanceService;