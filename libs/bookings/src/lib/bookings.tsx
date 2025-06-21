import { Heading, Row } from '@/shared';
import { BookingsTable } from './bookingsTable';
import { BookingTableOprations } from './bookingTableOperations';

export function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOprations />
      </Row>
      <BookingsTable />
    </>
  );
}
