import React from 'react';
import { Container, Title, Text } from '@mantine/core';

const AboutUsPage: React.FC = () => {
  return (
    <Container size="xl" py="md">
      <Title order={1}>About Us</Title>
      <Text mt="md">This is the About Us page. Content coming soon!</Text>
    </Container>
  );
};

export default AboutUsPage;