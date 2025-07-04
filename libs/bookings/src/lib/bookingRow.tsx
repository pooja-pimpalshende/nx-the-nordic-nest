import styled from 'styled-components';
import {
  Booking,
  ConfirmDelete,
  formatCurrency,
  formatDistanceFromNow,
  Menus,
  Modal,
  Table,
  Tag,
} from '@/shared';
import { format, isToday } from 'date-fns';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from '@tanstack/react-router';
import { useCheckout } from '@/checkin';
import { useDeleteBooking } from './hooks/useDeleteBooking';

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
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

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

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate({ to: `/bookings/${bookingId}` })}
            >
              See Deatils
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate({ to: `/checkin/${bookingId}` })}
              >
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => {
                  console.log('bookingId', bookingId);
                  checkout(bookingId);
                }}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete Booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
