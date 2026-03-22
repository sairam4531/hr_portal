import api from './api';

export interface PerformanceReview {
  _id: string;
  employeeId: string;
  employeeName: string;
  reviewer: string;
  period: string;
  rating: number;
  strengths: string;
  improvements: string;
  status: 'completed' | 'pending';
  createdAt: string;
}

export interface CreateReviewPayload {
  employeeId: string;
  period: string;
  rating: number;
  strengths: string;
  improvements: string;
}

const performanceService = {
  getAll: (params?: { employeeId?: string; period?: string }) =>
    api.get<PerformanceReview[]>('/performance', { params }),

  getMyReviews: () =>
    api.get<PerformanceReview[]>('/performance/my'),

  create: (data: CreateReviewPayload) =>
    api.post<PerformanceReview>('/performance', data),

  update: (id: string, data: Partial<CreateReviewPayload>) =>
    api.put<PerformanceReview>(`/performance/${id}`, data),
};

export default performanceService;
