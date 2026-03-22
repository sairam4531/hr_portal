import api from "./api";

const userService = {
  createHR: (data) => api.post("/users/create-hr", data),

  createEmployee: (data) => api.post("/users/create-employee", data),

  getAllHRs: () => api.get("/users/hrs"),

  getAllEmployees: () => api.get("/users/employees"),

  getUserById: (id) => api.get(`/users/${id}`),

  updateUser: (id, data) => api.put(`/users/${id}`, data),

  deleteUser: (id) => api.delete(`/users/${id}`),

  toggleActive: (id) => api.patch(`/users/${id}/toggle-active`)
};

export default userService;