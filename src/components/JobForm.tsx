import {
  TextInput,
  Textarea,
  Select,
  Button,
  Grid,
  Card,
  Title,
  Stack,
  Group,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, Controller } from 'react-hook-form';
import { CreateJobRequest } from '@/types/job';
import { IconBriefcase, IconBuilding, IconMapPin, IconCurrencyDollar } from '@tabler/icons-react';
import dayjs from 'dayjs';

interface JobFormProps {
  onSubmit: (data: CreateJobRequest) => void;
  loading?: boolean;
  initialData?: Partial<CreateJobRequest>;
}

const JOB_TYPES = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

export function JobForm({ onSubmit, loading, initialData }: JobFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateJobRequest>({
    defaultValues: {
      title: initialData?.title || '',
      company: initialData?.company || '',
      location: initialData?.location || '',
      jobType: initialData?.jobType || 'full-time',
      salaryRange: initialData?.salaryRange || '',
      description: initialData?.description || '',
      requirements: initialData?.requirements || '',
      responsibilities: initialData?.responsibilities || '',
      applicationDeadline: initialData?.applicationDeadline || '',
    },
  });

  const handleFormSubmit = (data: CreateJobRequest) => {
    onSubmit(data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Card shadow="sm" padding="xl" radius="md">
      <Title order={2} mb="xl">
      <p className='text-center'> Create New Job Posting</p>
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="sm">
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Job Title"
                placeholder="e.g., Senior Frontend Developer"
                leftSection={<IconBriefcase size={16} />}
                withAsterisk
                error={errors.title?.message}
                {...register('title', {
                  required: 'Job title is required',
                  minLength: {
                    value: 2,
                    message: 'Job title must be at least 2 characters',
                  },
                })}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Company Name"
                placeholder="e.g., Tech Solutions Inc."
                leftSection={<IconBuilding size={16} />}
                withAsterisk
                error={errors.company?.message}
                {...register('company', {
                  required: 'Company name is required',
                  minLength: {
                    value: 2,
                    message: 'Company name must be at least 2 characters',
                  },
                })}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Location"
                placeholder="e.g., New York, NY"
                leftSection={<IconMapPin size={16} />}
                withAsterisk
                error={errors.location?.message}
                {...register('location', {
                  required: 'Location is required',
                })}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Controller
                name="jobType"
                control={control}
                rules={{ required: 'Job type is required' }}
                render={({ field }) => (
                  <Select
                    label="Job Type"
                    placeholder="Select job type"
                    data={JOB_TYPES}
                    withAsterisk
                    error={errors.jobType?.message}
                    {...field}
                  />
                )}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Salary Range"
                placeholder="e.g., $80k - $120k"
                leftSection={<IconCurrencyDollar size={16} />}
                withAsterisk
                error={errors.salaryRange?.message}
                {...register('salaryRange', {
                  required: 'Salary range is required',
                })}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Controller
                name="applicationDeadline"
                control={control}
                rules={{
                  required: 'Application deadline is required',
                  validate: (value) => {
                    if (dayjs(value).isBefore(dayjs(), 'day')) {
                      return 'Deadline must be in the future';
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <DateInput
                    label="Application Deadline"
                    placeholder="Select deadline date"
                    withAsterisk
                    error={errors.applicationDeadline?.message}
                    minDate={new Date()}
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date?.toISOString())}
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            label="Job Description"
            placeholder="Provide a detailed description of the job role..."
            minRows={4}
            withAsterisk
            error={errors.description?.message}
            {...register('description', {
              required: 'Job description is required',
              minLength: {
                value: 50,
                message: 'Description must be at least 50 characters',
              },
            })}
          />

          <Textarea
            label="Requirements"
            placeholder="List the required qualifications and skills..."
            minRows={3}
            withAsterisk
            error={errors.requirements?.message}
            {...register('requirements', {
              required: 'Requirements are required',
              minLength: {
                value: 20,
                message: 'Requirements must be at least 20 characters',
              },
            })}
          />

          <Textarea
            label="Responsibilities"
            placeholder="Describe the main responsibilities..."
            minRows={3}
            withAsterisk
            error={errors.responsibilities?.message}
            {...register('responsibilities', {
              required: 'Responsibilities are required',
              minLength: {
                value: 20,
                message: 'Responsibilities must be at least 20 characters',
              },
            })}
          />

          <Group justify="flex-end" mt="xl">
            <Button type="button" variant="light" onClick={handleReset}>
              Reset Form
            </Button>
            <Button type="submit" loading={loading} size="md">
              Create Job Posting
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}