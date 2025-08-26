import { AppShell, Container, Group, Button, Text, ColorInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CreateJD from './CenterModal';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [opened, { close, open }] = useDisclosure(true);

  const navLinks = [
    { href: '/jobs', label: 'Home' },
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
                  className='text-black'
                    key={link.href}
                    component={Link}
                    href={link.href}
                    style={{
                      fontFamily: 'Satoshi Variable, sans-serif',
                      fontWeight: 500,
                      fontSize: '16px',
                      color:   'black', 
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                    variant={router.pathname === link.href ? 'subtle' : 'subtle'}
                  >
                    <span>{link.label}</span>
                  </Button>
                ))}
              </Group>
              <Button

                leftSection={<IconPlus size={16} />}
                variant="gradient"
                gradient={{ from: "#A128FF", to: "#6100AD", deg: 90 }}
                radius={100}
                onClick={open}
              >
                Create Jobs
              </Button>
              <>
              <CreateJD open={open} opened={opened} close={close} />
              </>
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