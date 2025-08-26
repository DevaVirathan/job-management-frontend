// src/utils/dataTransform.ts
import { CreateJobRequest, JobFormData } from '@/types/job';

export const transformJobDataForAPI = (formData: JobFormData): CreateJobRequest => {
  // Log the original form data
  console.log('🔄 Original form data:', formData);

  // Transform to match your NestJS backend DTO exactly
  const transformed: CreateJobRequest = {
    title: formData.title?.trim(),
    companyName: formData.company?.trim(), // Map 'company' to 'companyName'
    location: formData.location?.trim(),
    jobType: formData.jobType,
    salaryRange: formData.salaryRange?.trim(),
    jobDescription: formData.description?.trim(), // Map 'description' to 'jobDescription'
    requirements: formData.requirements?.trim(),
    responsibilities: formData.responsibilities?.trim(),
    applicationDeadline: formData.applicationDeadline,
  };

  // Remove any undefined, null, or empty string fields
  const cleaned = Object.fromEntries(
    Object.entries(transformed).filter(([_, value]) => 
      value !== undefined && value !== null && value !== ''
    )
  ) as CreateJobRequest;

  console.log('✨ Transformed data for backend:', cleaned);
  return cleaned;
};

export const validateJobData = (data: JobFormData): string[] => {
  const errors: string[] = [];

  // Required fields based on your DTO
  if (!data.title?.trim()) errors.push('Title is required');
  if (!data.company?.trim()) errors.push('Company is required');

  // Optional fields validation (only if provided)
  if (data.location && data.location.length > 255) {
    errors.push('Location must be less than 255 characters');
  }
  if (data.title && data.title.length > 255) {
    errors.push('Title must be less than 255 characters');
  }
  if (data.company && data.company.length > 255) {
    errors.push('Company name must be less than 255 characters');
  }
  if (data.salaryRange && data.salaryRange.length > 100) {
    errors.push('Salary range must be less than 100 characters');
  }

  // Validate date format if provided
  if (data.applicationDeadline) {
    const date = new Date(data.applicationDeadline);
    if (isNaN(date.getTime())) {
      errors.push('Invalid application deadline format');
    }
    // Note: Your backend allows past dates, so no future date validation
  }

  return errors;
};