// src/services/api.ts - Enhanced with debugging
import axios from 'axios';
import { Job, JobFilters, CreateJobRequest } from '@/types/job';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL}${config.url}`,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      data: response.data,
      url: response.config.url,
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export const jobService = {
  // Get all jobs with filters
  getJobs: async (filters?: JobFilters): Promise<Job[]> => {
    try {
      const params = new URLSearchParams();
      
      if (filters?.title) params.append('title', filters.title);
      if (filters?.location) params.append('location', filters.location);
      if (filters?.jobType) params.append('jobType', filters.jobType);

      const response = await api.get(`/api/jobs?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      throw error;
    }
  },

  // Create a new job
  createJob: async (jobData: CreateJobRequest): Promise<Job> => {
    try {
      console.log('📝 Creating job with data:', jobData);
      
      const response = await api.post('/api/jobs', jobData);
      return response.data;
    } catch (error: any) {
      console.error('Failed to create job:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },

  // Get job by ID
  getJobById: async (id: string): Promise<Job> => {
    try {
      const response = await api.get(`/api/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch job ${id}:`, error);
      throw error;
    }
  },

  // Update job
  updateJob: async (id: string, jobData: Partial<CreateJobRequest>): Promise<Job> => {
    try {
      const response = await api.patch(`/api/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update job ${id}:`, error);
      throw error;
    }
  },

  // Delete job
  deleteJob: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/jobs/${id}`);
    } catch (error) {
      console.error(`Failed to delete job ${id}:`, error);
      throw error;
    }
  },
};