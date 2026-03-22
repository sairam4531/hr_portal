export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'on-leave' | 'terminated';
  phone: string;
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'processed' | 'pending';
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  applicants: number;
  status: 'open' | 'closed';
  postedDate: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewer: string;
  period: string;
  rating: number;
  strengths: string;
  improvements: string;
  status: 'completed' | 'pending';
}

export const employees: Employee[] = [
  { id: '1', name: 'Aisha Patel', email: 'aisha@company.com', department: 'Engineering', position: 'Senior Developer', joinDate: '2022-03-15', salary: 95000, status: 'active', phone: '+1 555-0101' },
  { id: '2', name: 'James Okonkwo', email: 'james@company.com', department: 'Design', position: 'UX Lead', joinDate: '2021-07-01', salary: 88000, status: 'active', phone: '+1 555-0102' },
  { id: '3', name: 'Elena Vasquez', email: 'elena@company.com', department: 'Marketing', position: 'Marketing Manager', joinDate: '2023-01-10', salary: 82000, status: 'active', phone: '+1 555-0103' },
  { id: '4', name: 'Ravi Sharma', email: 'ravi@company.com', department: 'Engineering', position: 'DevOps Engineer', joinDate: '2022-09-20', salary: 91000, status: 'on-leave', phone: '+1 555-0104' },
  { id: '5', name: 'Nina Johansson', email: 'nina@company.com', department: 'HR', position: 'HR Specialist', joinDate: '2023-05-12', salary: 72000, status: 'active', phone: '+1 555-0105' },
  { id: '6', name: 'Carlos Mendez', email: 'carlos@company.com', department: 'Finance', position: 'Financial Analyst', joinDate: '2021-11-30', salary: 85000, status: 'active', phone: '+1 555-0106' },
  { id: '7', name: 'Fatima Al-Rashid', email: 'fatima@company.com', department: 'Engineering', position: 'Frontend Developer', joinDate: '2023-08-01', salary: 78000, status: 'active', phone: '+1 555-0107' },
  { id: '8', name: 'Tomasz Kowalski', email: 'tomasz@company.com', department: 'Sales', position: 'Account Executive', joinDate: '2022-06-15', salary: 76000, status: 'terminated', phone: '+1 555-0108' },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: '1', employeeId: '1', employeeName: 'Aisha Patel', date: '2024-01-15', checkIn: '09:02', checkOut: '18:15', status: 'present' },
  { id: '2', employeeId: '2', employeeName: 'James Okonkwo', date: '2024-01-15', checkIn: '09:35', checkOut: '17:50', status: 'late' },
  { id: '3', employeeId: '3', employeeName: 'Elena Vasquez', date: '2024-01-15', checkIn: '08:55', checkOut: '18:00', status: 'present' },
  { id: '4', employeeId: '4', employeeName: 'Ravi Sharma', date: '2024-01-15', checkIn: '', checkOut: '', status: 'absent' },
  { id: '5', employeeId: '5', employeeName: 'Nina Johansson', date: '2024-01-15', checkIn: '09:00', checkOut: '13:00', status: 'half-day' },
  { id: '6', employeeId: '6', employeeName: 'Carlos Mendez', date: '2024-01-15', checkIn: '08:45', checkOut: '17:30', status: 'present' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: '1', employeeId: '4', employeeName: 'Ravi Sharma', type: 'sick', startDate: '2024-01-15', endDate: '2024-01-17', reason: 'Flu recovery', status: 'approved' },
  { id: '2', employeeId: '1', employeeName: 'Aisha Patel', type: 'annual', startDate: '2024-02-01', endDate: '2024-02-05', reason: 'Family vacation', status: 'pending' },
  { id: '3', employeeId: '3', employeeName: 'Elena Vasquez', type: 'personal', startDate: '2024-01-20', endDate: '2024-01-20', reason: 'Moving day', status: 'pending' },
  { id: '4', employeeId: '7', employeeName: 'Fatima Al-Rashid', type: 'annual', startDate: '2024-03-10', endDate: '2024-03-15', reason: 'Travel abroad', status: 'rejected' },
];

export const payrollRecords: PayrollRecord[] = [
  { id: '1', employeeId: '1', employeeName: 'Aisha Patel', month: 'Jan 2024', basicSalary: 7917, allowances: 1200, deductions: 890, netSalary: 8227, status: 'processed' },
  { id: '2', employeeId: '2', employeeName: 'James Okonkwo', month: 'Jan 2024', basicSalary: 7333, allowances: 1000, deductions: 820, netSalary: 7513, status: 'processed' },
  { id: '3', employeeId: '3', employeeName: 'Elena Vasquez', month: 'Jan 2024', basicSalary: 6833, allowances: 900, deductions: 760, netSalary: 6973, status: 'pending' },
  { id: '4', employeeId: '6', employeeName: 'Carlos Mendez', month: 'Jan 2024', basicSalary: 7083, allowances: 1100, deductions: 850, netSalary: 7333, status: 'processed' },
];

export const jobPostings: JobPosting[] = [
  { id: '1', title: 'Senior React Developer', department: 'Engineering', location: 'Remote', type: 'full-time', applicants: 47, status: 'open', postedDate: '2024-01-05' },
  { id: '2', title: 'Product Designer', department: 'Design', location: 'New York', type: 'full-time', applicants: 23, status: 'open', postedDate: '2024-01-10' },
  { id: '3', title: 'Data Analyst', department: 'Finance', location: 'Chicago', type: 'contract', applicants: 31, status: 'open', postedDate: '2024-01-08' },
  { id: '4', title: 'Marketing Intern', department: 'Marketing', location: 'Remote', type: 'part-time', applicants: 68, status: 'closed', postedDate: '2023-12-15' },
];

export const performanceReviews: PerformanceReview[] = [
  { id: '1', employeeId: '1', employeeName: 'Aisha Patel', reviewer: 'Sarah Chen', period: 'Q4 2023', rating: 4.5, strengths: 'Excellent problem-solving, strong leadership', improvements: 'Could improve documentation habits', status: 'completed' },
  { id: '2', employeeId: '2', employeeName: 'James Okonkwo', reviewer: 'Sarah Chen', period: 'Q4 2023', rating: 4.2, strengths: 'Creative designs, user-centric approach', improvements: 'Time management on larger projects', status: 'completed' },
  { id: '3', employeeId: '3', employeeName: 'Elena Vasquez', reviewer: 'Marcus Rivera', period: 'Q4 2023', rating: 3.8, strengths: 'Strong campaign execution', improvements: 'Data-driven decision making', status: 'pending' },
  { id: '4', employeeId: '6', employeeName: 'Carlos Mendez', reviewer: 'Marcus Rivera', period: 'Q4 2023', rating: 4.7, strengths: 'Meticulous analysis, great attention to detail', improvements: 'Presentation skills', status: 'completed' },
];

export const dashboardStats = {
  totalEmployees: 8,
  activeEmployees: 6,
  onLeave: 1,
  openPositions: 3,
  pendingLeaves: 2,
  attendanceRate: 83.3,
  payrollTotal: 30046,
  avgPerformance: 4.3,
};

export const monthlyAttendance = [
  { month: 'Aug', present: 92, absent: 8 },
  { month: 'Sep', present: 88, absent: 12 },
  { month: 'Oct', present: 95, absent: 5 },
  { month: 'Nov', present: 90, absent: 10 },
  { month: 'Dec', present: 85, absent: 15 },
  { month: 'Jan', present: 83, absent: 17 },
];

export const departmentDistribution = [
  { name: 'Engineering', value: 3, fill: 'hsl(221, 83%, 53%)' },
  { name: 'Design', value: 1, fill: 'hsl(262, 83%, 58%)' },
  { name: 'Marketing', value: 1, fill: 'hsl(142, 71%, 45%)' },
  { name: 'HR', value: 1, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Finance', value: 1, fill: 'hsl(0, 72%, 51%)' },
  { name: 'Sales', value: 1, fill: 'hsl(200, 70%, 50%)' },
];
