import { subDays } from 'date-fns';
import { useSearch } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getStaysAfterDate } from '@/bookings';

export function useRecentStays() {
  const serachParams = useSearch({ from: '/app-layout/dashboard' });
  const last = serachParams.last;
  const numDays = !last ? 7 : Number(last);

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isPending, data: stays } = useQuery({
    queryKey: ['stays', `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  );

  return { isPending, stays, confirmedStays, numDays };
}
