import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../services';
import { useSearch } from '@tanstack/react-router';
import { Booking } from '@/shared';

export function useBookings() {
  const searchParams = useSearch({ from: '/app-layout/bookings' });

  const filterValue = searchParams.status;

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
  // { field: 'totalPrice', value: 5000, method: 'gte' };

  const sortByRaw = searchParams.sortBy || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };
  const page = !searchParams.page ? 1 : Number(searchParams.page);

  const { isPending, data, error } = useQuery<{
    data: Booking[];
    count: number | null;
  }>({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  return { isPending, bookings, error, count };
}
