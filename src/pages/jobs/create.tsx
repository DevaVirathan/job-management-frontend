// src/pages/jobs/create.tsx - Fixed to match backend DTO
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import { JobForm } from '@/components/JobForm';
import { JobFormData } from '@/types/job';
import { jobService } from '@/services/api';
import { notifications } from '@mantine/notifications';
import { transformJobDataForAPI, validateJobData } from '@/utils/dataTransform';

export default function CreateJobPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: JobFormData) => {
    try {
      setLoading(true);
      
      console.log('📋 Form submitted with data:', formData);
      
      // Validate data on client side
      const validationErrors = validateJobData(formData);
      if (validationErrors.length > 0) {
        notifications.show({
          title: 'Validation Error',
          message: validationErrors.join(', '),
          color: 'red',
        });
        return;
      }
      
      // Transform data to match backend DTO
      const backendData = transformJobDataForAPI(formData);
      
      // Create job
      const result = await jobService.createJob(backendData);
      console.log('✅ Job created successfully:', result);
      
      notifications.show({
        title: 'Success',
        message: 'Job created successfully!',
        color: 'green',
      });
      
      router.push('/jobs');
      
    } catch (error: any) {
      console.error('❌ Error creating job:', error);
      
      let errorMessage = 'Failed to create job. Please try again.';
      
      // Handle specific error cases
      if (error.response?.status === 400) {
        const backendError = error.response.data;
        console.log('🔍 Backend error details:', backendError);
        
        if (backendError.message) {
          errorMessage = Array.isArray(backendError.message) 
            ? backendError.message.join(', ')
            : backendError.message;
        } else if (backendError.error) {
          errorMessage = backendError.error;
        } else {
          errorMessage = 'Invalid data format. Please check all fields.';
        }
      } else if (error.response?.status === 422) {
        errorMessage = 'Validation failed. Please check your input.';
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to server. Please check if your backend is running.';
      }
      
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
        autoClose: false, // Don't auto-close error messages
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <JobForm onSubmit={handleSubmit} loading={loading} />
    </Layout>
  );
}