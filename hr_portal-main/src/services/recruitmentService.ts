import api from './api';

export interface JobPosting {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  applicants: number;
  status: 'open' | 'closed';
  postedDate: string;
  createdAt: string;
}

export interface Applicant {
  _id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  status: 'applied' | 'shortlisted' | 'selected' | 'rejected';
  createdAt: string;
}

export interface CreateJobPayload {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const recruitmentService = {
  getJobs: (params?: { status?: string }) =>
    api.get<JobPosting[]>('/recruitment/jobs', { params }),

  createJob: (data: CreateJobPayload) =>
    api.post<JobPosting>('/recruitment/jobs', data),

  updateJob: (id: string, data: Partial<CreateJobPayload & { status: string }>) =>
    api.put<JobPosting>(`/recruitment/jobs/${id}`, data),

  getApplicants: (jobId: string) =>
    api.get<Applicant[]>(`/recruitment/jobs/${jobId}/applicants`),

  updateApplicantStatus: (applicantId: string, status: string) =>
    api.patch<Applicant>(`/recruitment/applicants/${applicantId}`, { status }),
};

export default recruitmentService;
