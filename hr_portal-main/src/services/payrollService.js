import api from "./api";

const payrollService = {
  getAll: (params) => api.get("/payroll", { params }),

  getByEmployee: (employeeId) => api.get(`/payroll/employee/${employeeId}`),

  generate: (data) => api.post("/payroll", data),

  getMyPayslips: () => api.get("/payroll/my")
};

export default payrollService;