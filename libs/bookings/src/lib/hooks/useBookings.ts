import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../services';
import { useSearch } from '@tanstack/react-router';
import { Booking, PAGE_SIZE } from '@/shared';

export function useBookings() {
  const queryClient = useQueryClient();
  const searchParams = useSearch({ from: '/app-layout/bookings' });

  //FILTER
  const filterValue = searchParams.status;
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
  // { field: 'totalPrice', value: 5000, method: 'gte' };

  //SORT
  const sortByRaw = searchParams.sortBy || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  //PAGINATION
  const page = !searchParams.page ? 1 : Number(searchParams.page);

  //QUERY
  const { isPending, data, error } = useQuery<{
    data: Booking[];
    count: number | null;
  }>({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isPending, bookings, error, count };
}
