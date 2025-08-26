import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import "../app/main.css"
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { Layout } from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Notifications />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}