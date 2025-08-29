'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { JobCard } from '@/components/JobCard';
import { JobFiltersComponent } from '@/components/JobFilters';
import { jobService } from '@/services/api';
import { Job, JobFilters } from '@/types/job';
import { Container, Title, Text, Loader, Alert, SimpleGrid, Center } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const MainJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>({
    title: '',
    location: '',
    jobType: '',
  });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedJobs = await jobService.getJobs(filters);
      console.log('Fetched Jobs:', JSON.stringify(fetchedJobs, null, 2)); // Modified for better debugging
      setJobs(fetchedJobs); // Correctly extract the data array
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleFiltersChange = (newFilters: JobFilters) => {
    setFilters(newFilters);
  };

  return (

     <div >
       <JobFiltersComponent onFiltersChange={handleFiltersChange} loading={loading} />
    <Container size="xl" py="md">
   

    

      {loading && (
        <Center mt="xl">
          <Loader size="lg" />
          <Text ml="sm">Loading jobs...</Text>
        </Center>
      )}

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" variant="light" mt="md">
          {error}
        </Alert>
      )}

      {!loading && !error && jobs.length === 0 && (
        <Alert color="blue" variant="light" mt="md">
          No jobs found matching your criteria.
        </Alert>
      )}

      {!loading && !error && jobs.length > 0 && (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </SimpleGrid>
      )}
    </Container>
     </div>
  );
};

export default MainJobsPage;
