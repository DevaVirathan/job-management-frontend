import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  Divider,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import {
  IconMapPin,
  IconCalendar,
  IconCurrencyDollar,
  IconEdit,
  IconTrash,
  IconEye,
} from '@tabler/icons-react';
import { Job } from '@/types/job';
import dayjs from 'dayjs';

interface JobCardProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (jobId: string) => void;
  onView?: (job: Job) => void;
}

const JOB_TYPE_COLORS = {
  'full-time': 'blue',
  'part-time': 'green',
  'contract': 'orange',
  'internship': 'purple',
  'other': 'gray', // fallback color
} as const;

// Helper function to safely format job type
const formatJobType = (jobType: string | null | undefined): string => {
  if (!jobType) return 'Other';
  const formattedType = jobType.toLowerCase();
  return formattedType.charAt(0).toUpperCase() + formattedType.slice(1);
};

// Helper function to get job type color
const getJobTypeColor = (jobType: string | null | undefined): string => {
  if (!jobType) return 'gray';
  const normalizedType = jobType.toLowerCase() as keyof typeof JOB_TYPE_COLORS;
  return JOB_TYPE_COLORS[normalizedType] || 'gray';
};

export function JobCard({ job, onEdit, onDelete, onView }: JobCardProps) {
  const isDeadlineSoon = job.applicationDeadline 
    ? dayjs(job.applicationDeadline).diff(dayjs(), 'days') <= 7
    : false;
console.log("job_data",job )
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="sm" style={{
        flex: 1,
        justifyContent:"center",
        alignContent:"center"
      }}>
        <Group justify="space-between" align="flex-start">
        
          <div style={{ flex: 1 }}>
            <Text fw={600} size="lg" lineClamp={2}>
              {job.title || 'Untitled Job'}
            </Text>
            <Text c="dimmed" size="sm" mt={4}>
              {job.companyName || 'Unknown Company'}
            </Text>
          </div>
            <div>
                 <Badge color={getJobTypeColor(job.jobType)} variant="light">
           24h Ago
          </Badge>
          </div>
          <Group gap="xs">
            {onView && (
              <Tooltip label="View Details">
                <ActionIcon variant="light" color="blue" onClick={() => onView(job)}>
                  <IconEye size={16} />
                </ActionIcon>
              </Tooltip>
            )}
            {onEdit && (
              <Tooltip label="Edit Job">
                <ActionIcon variant="light" color="orange" onClick={() => onEdit(job)}>
                  <IconEdit size={16} />
                </ActionIcon>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip label="Delete Job">
                <ActionIcon variant="light" color="red" onClick={() => onDelete(job.id)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </Group>

        <Group gap="xs">
          <Badge color={getJobTypeColor(job.jobType)} variant="light">
            {formatJobType(job.jobType)}
          </Badge>
          {isDeadlineSoon && (
            <Badge color="red" variant="light">
              Deadline Soon
            </Badge>
          )}
        </Group>

        <Group gap="md">
          <Group gap="xs">
            <IconMapPin size={16} color="gray" />
            <Text size="sm" c="dimmed">
              {job.location || 'Location not specified'}
            </Text>
          </Group>
          <Group gap="xs">
            <IconCurrencyDollar size={16} color="gray" />
            <Text size="sm" c="dimmed">
              {job.salaryRange || 'Salary not specified'}
            </Text>
          </Group>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {job.jobDescription || 'No description available'}
        </Text>

        <Divider />

        <Group justify="space-between">
          <Group gap="xs">
            <IconCalendar size={16} color="gray" />
            <Text size="xs" c="dimmed">
              Deadline: {job.applicationDeadline 
                ? dayjs(job.applicationDeadline).format('MMM DD, YYYY')
                : 'Not specified'
              }
            </Text>
          </Group>
          <Text size="xs" c="dimmed">
            Posted: {job.createdAt 
              ? dayjs(job.createdAt).format('MMM DD, YYYY')
              : 'Unknown'
            }
          </Text>
        </Group>
        
        <Button radius={8}> Apply Now </Button>
      </Stack>
    </Card>
  );
}