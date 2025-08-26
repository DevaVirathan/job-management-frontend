import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Text, Badge } from '@mantine/core';
import { JobForm } from './JobForm';
import CreateJobPage from '@/pages/jobs/create';

export default function CreateJD({opened,open,close}) {
  return (
    <>
      <Modal opened={opened} onClose={close} size="65%" h={"auto"} radius={"xl"}>
        <CreateJobPage />
      </Modal>
    </>
  );
}