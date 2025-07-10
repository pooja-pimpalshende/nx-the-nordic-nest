import { subDays } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { getBookingAfterDate } from '@/bookings';

export function useRecentBookings() {
  const searchParams = useSearch({ from: '/app-layout/dashboard' });
  const last = searchParams.last;
  const numDays = !last ? 7 : Number(last);

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isPending, data: bookings } = useQuery({
    queryKey: ['bookings', `last-${numDays}`],
    queryFn: () => getBookingAfterDate(queryDate),
  });

  return { isPending, bookings };
}
