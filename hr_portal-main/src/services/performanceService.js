import api from "./api";

const performanceService = {
  getAll: (params) => api.get("/performance", { params }),

  getMyReviews: () => api.get("/performance/my"),

  create: (data) => api.post("/performance", data),

  update: (id, data) => api.put(`/performance/${id}`, data)
};

export default performanceService;