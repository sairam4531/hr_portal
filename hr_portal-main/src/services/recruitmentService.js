import api from "./api";

const recruitmentService = {
  getJobs: (params) => api.get("/recruitment/jobs", { params }),

  createJob: (data) => api.post("/recruitment/jobs", data),

  updateJob: (id, data) => api.put(`/recruitment/jobs/${id}`, data),

  getApplicants: (jobId) => api.get(`/recruitment/jobs/${jobId}/applicants`),

  updateApplicantStatus: (applicantId, status) =>
  api.patch(`/recruitment/applicants/${applicantId}`, { status })
};

export default recruitmentService;