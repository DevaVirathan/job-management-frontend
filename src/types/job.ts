// src/types/job.ts - Updated types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  salaryRange: string;
  description: string;
  requirements: string;
  responsibilities: string;
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
  requirements?: string; // Optional in backend
  responsibilities?: string; // Optional in backend
  applicationDeadline?: string; // Optional in backend, ISO string format
}

// For form handling (UI-friendly field names)
export interface JobFormData {
  title: string;
  company: string; // UI uses 'company'
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  salaryRange: string;
  description: string; // UI uses 'description'
  requirements: string;
  responsibilities: string;
  applicationDeadline: string;
}