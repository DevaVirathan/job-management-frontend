export interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  salaryRange: string;
  jobDescription: string;
  applicationDeadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobFilters {
  title?: string;
  location?: string;
  jobType?: string;
}

// Updated to match your NestJS backend DTO exactly
export interface CreateJobRequest {
  title: string;
  companyName: string; // Backend expects 'companyName'
  location?: string; // Optional in backend
  jobType?: 'full-time' | 'part-time' | 'contract' | 'internship'; // Optional in backend
  salaryRange?: string; // Optional in backend
  jobDescription?: string; // Backend expects 'jobDescription'
  applicationDeadline?: string; // Optional in backend, ISO string format
}

// For form handling (UI-friendly field names)
export interface JobFormData {
  title: string;
  companyName: string; // UI uses 'company'
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  salaryRange: string;
  jobDescription: string; // UI uses 'description'
  requirements: string;
  responsibilities: string;
  applicationDeadline: string;
}
