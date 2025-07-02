import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../services';
import { useParams } from '@tanstack/react-router';

export function useBooking() {
  const params = useParams({ from: '/app-layout/bookings/$bookingId' });
  const bookingId = params.bookingId;
  const {
    isPending,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { isPending, booking, error };
}
