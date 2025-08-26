import { AppShell, Container, Group, Button, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Find Jobs' },
    { href: '/find-talents', label: 'Find Talents' },
    { href: '/about-us', label: 'About us' },
    { href: '/testimonials', label: 'Testimonials' },
  ];

  return (
    <AppShell
      header={{ height: 80 }}
      padding="md"
    >
        <AppShell.Header style={{
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          margin: '10px auto',
          maxWidth: '60%',
          width: '60%',
          position: 'sticky',
          top: '10px',
          zIndex: 100,
          backgroundColor: 'white',
          padding: '0 20px',
        }}>
          <Container size="xl" h="100%">
            <Group justify="space-between" h="100%">
              <Group>
                <Image src="/cybermind_works_logo.jpeg" alt="Logo" width={32} height={32} />
              </Group>
              <Group>
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    component={Link}
                    href={link.href}
                    variant={router.pathname === link.href ? 'subtle' : 'subtle'}
                  >
                    {link.label}
                  </Button>
                ))}
              </Group>
              <Button
                component={Link}
                href="/jobs/create"
                leftSection={<IconPlus size={16} />}
                variant="filled"
                color="violet"
                radius={100}
              >
                Create Jobs
              </Button>
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