import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../services';
import { useSearch } from '@tanstack/react-router';

export function useBookings() {
  const searchParams = useSearch({ from: '/app-layout/bookings' });

  const filterValue = searchParams.status;

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
  // { field: 'totalPrice', value: 5000, method: 'gte' };

  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings({ filter }),
  });

  return { isPending, bookings, error };
}
