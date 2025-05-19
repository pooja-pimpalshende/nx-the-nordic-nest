import { Heading, Row } from '@/shared';
import { UpdateSettingsForm } from './updateSettingsForm';

export function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}
