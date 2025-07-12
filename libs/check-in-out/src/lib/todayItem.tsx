import { Button, Flag, Tag } from '@/shared';
import { Link } from '@tanstack/react-router';
import styled from 'styled-components';
import { Booking } from '@/shared';
import { CheckoutButton } from './checkoutButton';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

type TodayItemProps = {
  activity: Booking & {
    guests: {
      fullName: string | null;
      country?: string | null;
      countryFlag: string | null;
    } | null;
  };
};

export function TodayItem({ activity }: TodayItemProps) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}

      <Flag
        src={guests?.countryFlag ?? ''}
        alt={`Flag of ${guests?.country}`}
      />
      <Guest>{guests?.fullName}</Guest>
      <div>{numNights} nights</div>

      {status === 'unconfirmed' && (
        <Button
          sizes="small"
          variations="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}
