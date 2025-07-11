import { Heading, Row } from '@/shared';
import { DashboardLayout } from './dashboardLayout';
import { DashboardFilter } from './dashboardFilter';

export function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}
