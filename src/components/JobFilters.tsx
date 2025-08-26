
import {
  Group,
  TextInput,
  Select,
  Divider,
  RangeSlider,
  Text,
  Box,
} from '@mantine/core';
import {
  IconSearch,
  IconMapPin,
  IconBriefcase,
} from '@tabler/icons-react';
import { useState } from 'react';
import { JobFilters } from '@/types/job';

interface JobFiltersProps {
  onFiltersChange: (filters: JobFilters) => void;
}

const JOB_TYPES = [
  { value: 'Job Types', label: 'All Types' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

export function JobFiltersComponent({ onFiltersChange }: JobFiltersProps) {
  const [filters, setFilters] = useState<JobFilters>({
    title: '',
    location: '',
    jobType: '',
  });

  const [salary, setSalary] = useState<[number, number]>([50000, 80000]);

  const handleFilterChange = (key: keyof JobFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
<Box
  style={{
    fontFamily: 'Satoshi Variable, sans-serif',
    border: '1px solid #eaeaea',
    borderRadius: '12px',
    backgroundColor: 'white',
    padding: '16px 24px',
    width: '100%',         // use full parent/container width
    boxSizing: 'border-box',
  }}
> 
      <Group gap="xl" justify="space-between" wrap="nowrap" >
        {/* Search Title */}
        <Group gap="xs" style={{ flex: 1 }}>
          <IconSearch size={18} />
          <TextInput
            placeholder="Search By Job Title, Role"
            variant="unstyled"
            value={filters.title}
            onChange={(event) =>
              handleFilterChange('title', event.currentTarget.value)
            }
            style={{ flex: 1 }}
          />
        </Group>

        <Divider orientation="vertical" />

        {/* Location */}
        <Group gap="xs" style={{ flex: 1 }}>
          <IconMapPin size={18} />
          <Select
            placeholder="Preferred Location"
            variant="unstyled"
            data={[
              { value: 'remote', label: 'Remote' },
              { value: 'onsite', label: 'Onsite' },
              { value: 'hybrid', label: 'Hybrid' },
            ]}
            value={filters.location}
            onChange={(value) => handleFilterChange('location', value || '')}
            style={{ flex: 1 }}
          />
        </Group>

        <Divider orientation="vertical" />

        {/* Job Type */}
        <Group gap="xs" style={{ flex: 1 }}>
          <IconBriefcase size={18} />
          <Select
            placeholder="Job type"
            variant="unstyled"
            data={JOB_TYPES}
            value={filters.jobType}
            onChange={(value) => handleFilterChange('jobType', value || '')}
            style={{ flex: 1 }}
          />
        </Group>

        <Divider orientation="vertical" />

        {/* Salary Range */}
        <Group gap="sm" style={{ flex: 2 }}>
            <Text size="sm" c="black">
              Salary Per Month
            </Text>

            <RangeSlider
              min={10000}
              max={200000}
              step={5000}
              value={salary}
              onChange={setSalary}
              style={{ flex: 1 }}
              styles={{
                bar: {
                  border: "2px solid #222222", // black border
                  backgroundColor: "#222222",  // filled line color
                  height: "0px",               // keep it thin
                  opacity: 1,
                },
                track: {
                  height: "0px",               // base track line thin as well
                },
                thumb: {
                  borderColor: "#222222",
                  backgroundColor: "#222222",
                },
              }}
            />

            <Text size="sm">{`₹${salary[0] / 1000}k - ₹${salary[1] / 1000}k`}</Text>
          </Group>
        </Group>
      </Box>
  );
}
