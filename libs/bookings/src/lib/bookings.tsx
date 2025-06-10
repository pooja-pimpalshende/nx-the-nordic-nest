import { Heading, Row } from '@/shared';
import { BookingsTable } from './bookingsTable';

export function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
      </Row>
      <BookingsTable />
    </>
  );
}
