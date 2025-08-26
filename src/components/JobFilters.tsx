import { Grid, TextInput, Select, Card, Title, Button, Group } from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase, IconRefresh } from '@tabler/icons-react';
import { useState } from 'react';
import { JobFilters } from '@/types/job';

interface JobFiltersProps {
  onFiltersChange: (filters: JobFilters) => void;
  loading?: boolean;
}

const JOB_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

export function JobFiltersComponent({ onFiltersChange, loading }: JobFiltersProps) {
  const [filters, setFilters] = useState<JobFilters>({
    title: '',
    location: '',
    jobType: '',
  });

  const handleFilterChange = (key: keyof JobFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      title: '',
      location: '',
      jobType: '',
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
      <Group justify="space-between" mb="md">
        <Title order={4}>Filter Jobs</Title>
        <Button
          variant="light"
          size="sm"
          leftSection={<IconRefresh size={14} />}
          onClick={resetFilters}
        >
          Reset
        </Button>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <TextInput
            label="Job Title"
            placeholder="Search by job title..."
            leftSection={<IconSearch size={16} />}
            value={filters.title}
            onChange={(event) => handleFilterChange('title', event.currentTarget.value)}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <TextInput
            label="Location"
            placeholder="Search by location..."
            leftSection={<IconMapPin size={16} />}
            value={filters.location}
            onChange={(event) => handleFilterChange('location', event.currentTarget.value)}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
          <Select
            label="Job Type"
            placeholder="Select job type..."
            leftSection={<IconBriefcase size={16} />}
            data={JOB_TYPES}
            value={filters.jobType}
            onChange={(value) => handleFilterChange('jobType', value || '')}
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
}