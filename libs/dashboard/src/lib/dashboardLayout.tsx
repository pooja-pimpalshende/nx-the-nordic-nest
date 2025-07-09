import styled from 'styled-components';
import { useRecentBookings, useRecentStays } from './hooks';
import { Spinner } from '@/shared';

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
    confirmStays,
  } = useRecentStays();

  if (isPendingRecentBookings || isPendingRecentStays) return <Spinner />;

  console.log(bookings);

  return (
    <StyleddashboardLayout>
      <div>Statistic</div>
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <div>Chart Sales</div>
    </StyleddashboardLayout>
  );
}
