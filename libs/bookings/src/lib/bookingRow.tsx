import styled from 'styled-components';
import {
  Booking,
  formatCurrency,
  formatDistanceFromNow,
  Menus,
  Table,
  Tag,
} from '@/shared';
import { format, isToday } from 'date-fns';
import { HiEye } from 'react-icons/hi2';
import { useNavigate } from '@tanstack/react-router';

export type BookingRowProps = {
  booking: Booking & {
    guests: { fullName: string; email: string };
    cabins: { name: string };
    numGuest: number;
  };
};

type BookingStatus = 'unconfirmed' | 'checked-in' | 'checked-out';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

export function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuest,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: BookingRowProps) {
  const navigate = useNavigate();
  const statusToTagName: Record<BookingStatus, 'blue' | 'green' | 'silver'> = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>
          {startDate
            ? isToday(new Date(startDate))
              ? 'Today'
              : formatDistanceFromNow(startDate)
            : ''}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {startDate ? format(new Date(startDate), 'MMM dd yyyy') : ''} &mdash;{' '}
          {endDate ? format(new Date(endDate), 'MMM dd yyyy') : ''}
        </span>
      </Stacked>
      {status && (
        <Tag type={statusToTagName[status as BookingStatus]}>
          {status.replace('-', ' ')}
        </Tag>
      )}

      {totalPrice && <Amount>{formatCurrency(totalPrice)}</Amount>}

      <Menus.Menu>
        <Menus.Toggle id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate({ to: `/bookings/${bookingId}` })}
          >
            See Deatils
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}
