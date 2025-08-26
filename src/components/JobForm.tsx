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
import { IconBriefcase, IconBuilding, IconMapPin, IconCurrencyDollar, IconArrowRight } from '@tabler/icons-react';
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { LuArrowDownUp } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
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
      companyName: initialData?.companyName || '',
      location: initialData?.location || '',
      jobType: initialData?.jobType || 'full-time',
      salaryRange: initialData?.salaryRange || '',
      jobDescription: initialData?.jobDescription || '',
      applicationDeadline: initialData?.applicationDeadline || '',
    },
  });

  const handleFormSubmit = (data: CreateJobRequest) => {
    onSubmit(data);
  };


  return (
    <Card shadow="sm" padding="xl" radius="md" >
      <Title order={2} mb="l" style={{ 
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '24px',
        color: '#222222',
      }}>
           Create Job Opening
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="sm">
          <Grid>
            {/* Job Title */}
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Job Title"
                placeholder="e.g., Senior Frontend Developer"
                leftSection={<IconBriefcase size={16} />}
                error={errors.title?.message}
                {...register('title', { required: 'Job title is required' })}
                styles={{
                  input: {
                    height: "58px",
                    borderRadius: "10px",
                    border: "1px solid #222222",
                    background: "#FFFFFF",
                  },
                }}
              />
            </Grid.Col>

            {/* Company Name */}
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Company Name"
                placeholder="e.g., Tech Solutions Inc."
                leftSection={<IconBuilding size={16} />}
                error={errors.companyName?.message}
                {...register('companyName')}
                styles={{
                  input: {
                    height: "58px",
                    borderRadius: "10px",
                    border: "1px solid #222222",
                    background: "#FFFFFF",
                  },
                }}
              />
            </Grid.Col>

            {/* Location */}
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Location"
                placeholder="e.g., New York, NY"
                leftSection={<IconMapPin size={16} />}
                error={errors.location?.message}
                {...register('location')}
                styles={{
                  input: {
                    height: "58px",
                    borderRadius: "10px",
                    border: "1px solid #222222",
                    background: "#FFFFFF",
                  },
                }}
              />
            </Grid.Col>

            {/* Job Type */}
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Job Type"
                    placeholder="Full Time"
                    data={JOB_TYPES}
                    error={errors.jobType?.message}
                    {...field}
                    styles={{
                      input: {
                        height: "58px",
                        borderRadius: "10px",
                        border: "1px solid #222222",
                        background: "#FFFFFF",
                      },
                    }}
                  />
                )}
              />
            </Grid.Col>

            {/* Salary Range */}
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <label>Salary Range</label>
              <Group grow>
                <TextInput
                  placeholder="₹ 0"
                  leftSection={<LuArrowDownUp size={16} />}
                  styles={{
                    input: {
                      height: "58px",
                      borderRadius: "10px",
                      border: "1px solid #222222",
                      background: "#FFFFFF",
                    },
                  }}
                />
                <TextInput
                  placeholder="₹ 12,00,000"
                  leftSection={<LuArrowDownUp size={16} />}
                  styles={{
                    input: {
                      height: "58px",
                      borderRadius: "10px",
                      border: "1px solid #222222",
                      background: "#FFFFFF",
                    },
                  }}
                />
              </Group>
            </Grid.Col>

            {/* Application Deadline */}
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Controller
                name="applicationDeadline"
                control={control}
                render={({ field }) => (
                  <DateInput
                    label="Application Deadline"
                    placeholder="Select deadline date"
                    rightSection={<CiCalendar size={16} />}
                    minDate={new Date()}
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date?.toISOString())}
                    styles={{
                      input: {
                        height: "58px",
                        borderRadius: "10px",
                        border: "1px solid #222222",
                        background: "#FFFFFF",
                      },
                    }}
                  />
                )}
              />
            </Grid.Col>

            {/* Job Description - full width */}
            <Grid.Col span={12}>
              <Textarea
                label="Job Description"
                placeholder="Provide a description to let the candidate know more about the job role"
                minRows={4}
                error={errors.jobDescription?.message}
                styles={{
                  input: {
                    borderRadius: "10px",
                    border: "1px solid #222222",
                    background: "#FFFFFF",
                    height: "200px",
                  },
                }}
              />
            </Grid.Col>

            {/* Action Buttons */}
            <Grid.Col span={12}>
              <Group style={{justifyContent: 'space-between'}}>
                <Button
                  type="button"
                  rightSection={<MdKeyboardDoubleArrowDown size={16} color="black" />}
                  style={{
                    width: "232px",
                    height: "59px",
                    borderRadius: "10px",
                    border: "1.5px solid #222222",
                    background: "#FFFFFF",
                    boxShadow: "0px 0px 4px 0px #00000040",
                    color: "black",
                  }}
                >
                  Save Draft
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  rightSection={<MdKeyboardDoubleArrowRight size={16} color="white" />}
                  style={{
                    width: "207px",
                    height: "59px",
                    borderRadius: "10px",
                    background: "#00AAFF",
                  }}
                >
                  Publish
                </Button>
              </Group>
            </Grid.Col>
          </Grid>

        </Stack>
      </form>
    </Card>
  );
}