import { AppShell, Header, Container, Group, Title, Button } from '@mantine/core';
import { IconBriefcase, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <AppShell
      header={{ height: 80 }}
      padding="md"
    >
  
        <AppShell.Header>
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%">
            <Group>
              <IconBriefcase size={28} color="#228be6" />
              <Title order={3} c="blue">Job Management System</Title>
            </Group>
            <Group>
              <Button
                component={Link}
                href="/jobs"
                variant={router.pathname === '/jobs' ? 'filled' : 'light'}
              >
                All Jobs
              </Button>
              <Button
                component={Link}
                href="/jobs/create"
                leftSection={<IconPlus size={16} />}
                variant={router.pathname === '/jobs/create' ? 'filled' : 'light'}
              >
                Create Job
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}