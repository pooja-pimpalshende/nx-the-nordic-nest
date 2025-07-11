import { Booking, formatCurrency } from '@/shared';
import { Stat } from './stat';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

type StatsProps = {
  bookings:
    | {
        created_at: string;
        totalPrice: number | null;
        extraPrice: number | null;
      }[]
    | undefined;
  confirmedStays: Booking[] | undefined;
  numDays: number;
  cabinCounts: number;
};

export function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCounts,
}: StatsProps) {
  const numOfBookings = bookings?.length;

  const sales =
    bookings && bookings.reduce((acc, cur) => acc + (cur.totalPrice ?? 0), 0);

  const checkins = confirmedStays?.length;

  const occupation = confirmedStays?.reduce(
    (acc, cur) => acc + (cur.numNights ?? 0),
    0
  );

  const occupationCount = occupation && occupation / (numDays * cabinCounts);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOfBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales ?? 0)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rates"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round((occupationCount ?? 0) * 100) + '%'}
      />
    </>
  );
}
