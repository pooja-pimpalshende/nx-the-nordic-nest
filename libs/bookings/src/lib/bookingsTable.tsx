import { Empty, Menus, Pagination, Spinner, Table } from '@/shared';
import { BookingRow, BookingRowProps } from './bookingRow';
import { useBookings } from './hooks';

export function BookingsTable() {
  const { bookings, isPending } = useBookings();

  console.log(bookings);

  function isSafeBooking(
    booking: unknown
  ): booking is BookingRowProps['booking'] {
    return (
      typeof booking === 'object' &&
      booking !== null &&
      'guests' in booking &&
      'cabins' in booking &&
      'numGuest' in booking
    );
  }
  const safeBookings: BookingRowProps['booking'][] = (bookings ?? []).filter(
    isSafeBooking
  );

  if (isPending) return <Spinner />;
  if (!safeBookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
        </Table.Header>

        <Table.Body
          data={safeBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={45} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
