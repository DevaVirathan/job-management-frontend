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
import AvatarFallback from './AvatarFallback';
import { IoIosApps } from "react-icons/io";
import { GoPersonAdd } from "react-icons/go";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";



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
  'other': 'gray', 
} as const;

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

export function JobCard({ job }: JobCardProps) {
  const isDeadlineSoon = job.applicationDeadline
    ? dayjs(job.applicationDeadline).diff(dayjs(), 'days') <= 7
    : false;
  console.log("job_data", job)
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="sm" style={{
        flex: 1,
        justifyContent:"center",
        alignContent:"center"
      }}>
        <Group justify="space-between" align="flex-start">
        
          <div style={{ flex: 1 }}>
            <AvatarFallback imageUrl={null} name={job.companyName}/>
              <Text
                style={{
                  fontWeight: 700,        // bold
                  fontSize: "20px",       // matches your note
                  lineHeight: "100%",     // tighter spacing
                  letterSpacing: "0",     // normal
                  color: "#000000",       // black text
                }}
              />
              <Text lineClamp={2}  fw={550}>
                {job.title || "Untitled Job"}
              </Text>

            <Text c="dimmed" size="sm" mt={4}>
              {/* {job.companyName?.split("")?.map(n=>n.charAt(0).toUpperCase()) || 'Unknown Company'} */}
              {job.companyName}
            </Text>
          </div>
          <div>
            <Badge
              color={getJobTypeColor(job.jobType)}
              variant="light"
              sx={{
                width: 75,
                height: 33,
                borderRadius: 10,
                paddingTop: 7,
                paddingRight: 10,
                paddingBottom: 7,
                paddingLeft: 10,
                backgroundColor: "#B0D9FF",
                color: "black",
                fontWeight: 500,
                gap: 10,
                opacity: 1,
                top: 16,
                left: 222,
              }}
            >
              24h Ago
            </Badge>
          </div>

        </Group>

        <Group gap="md" style={{justifyContent: 'space-between'}}>
          <Group gap="xs">
            <GoPersonAdd size={16} color="gray" />
            <Text size="sm" c="dimmed">
              {'1-3 yr Exp'}
            </Text>
          </Group>
          <Group gap="xs">
            <HiOutlineBuildingOffice2 size={16} color="gray" />
            <Text size="sm" c="dimmed">
              {'Onsite'}
            </Text>
          </Group>
          <Group gap="xs">
            <IoIosApps size={16} color="gray" />
            <Text size="sm" c="dimmed">
              {job.salaryRange + 'LPA' || '12LPA'}
            </Text>
          </Group>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {job.jobDescription || 'No description available'}
        </Text>

        <Divider />


        <Button radius={8} style={{backgroundColor:'#00AAFF'}}> Apply Now </Button>
      </Stack>
    </Card>
  );
}
