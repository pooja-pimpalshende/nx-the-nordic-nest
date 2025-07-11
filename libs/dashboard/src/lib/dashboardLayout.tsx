import styled from 'styled-components';
import { useRecentBookings, useRecentStays } from './hooks';
import { Spinner } from '@/shared';
import { Stats } from './stats';
import { useCabin } from '@/cabins';
import { SalesChart } from './salesChart';
import { DurationChart } from './durationChart';

const StyleddashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export function DashboardLayout() {
  const { bookings, isPending: isPendingRecentBookings } = useRecentBookings();
  const {
    stays,
    isPending: isPendingRecentStays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isPending: isPendingCabins } = useCabin();

  if (isPendingRecentBookings || isPendingRecentStays || isPendingCabins)
    return <Spinner />;

  console.log(bookings);

  return (
    <StyleddashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCounts={cabins?.length ?? 0}
      />
      <div>Today's activity</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyleddashboardLayout>
  );
}
