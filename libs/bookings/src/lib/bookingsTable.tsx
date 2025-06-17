import { Empty, Menus, Spinner, Table } from '@/shared';
import { BookingRow, BookingRowProps } from './bookingRow';
import { useBookings } from './hooks';

export function BookingsTable() {
  const { bookings, isPending } = useBookings();

  console.log(bookings);
  const safeBookings: BookingRowProps['booking'][] = bookings ?? [];

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
      </Table>
    </Menus>
  );
}
