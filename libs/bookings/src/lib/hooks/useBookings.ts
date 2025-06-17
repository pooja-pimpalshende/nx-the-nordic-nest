import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../services';

export function useBookings() {
  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });

  return { isPending, bookings, error };
}
