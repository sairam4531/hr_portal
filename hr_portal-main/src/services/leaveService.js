import api from "./api";

const leaveService = {
  getAll: (params) => api.get("/leaves", { params }),

  getMyLeaves: () => api.get("/leaves/my"),

  apply: (data) => api.post("/leaves", data),

  approve: (id) => api.patch(`/leaves/${id}/approve`),

  reject: (id) => api.patch(`/leaves/${id}/reject`)
};

export default leaveService;