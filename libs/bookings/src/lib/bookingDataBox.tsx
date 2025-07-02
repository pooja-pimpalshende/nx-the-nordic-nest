import {
  Booking,
  DataItem,
  Flag,
  formatCurrency,
  formatDistanceFromNow,
} from '@/shared';
import { format, isToday } from 'date-fns';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import styled from 'styled-components';

export type BookingExtendedxProps = Booking & {
  guests: {
    fullName: string | null;
    email: string | null;
    country: string | null;
    countryFlag: string | null;
    nationalID: string | null;
  } | null;
  cabins: { name: string };
};

type BookingdataBoxProps = { booking: BookingExtendedxProps };

type PriceProps = {
  isPaid: boolean | null;
};

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: 'Sono';
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div<PriceProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  color: ${(props) =>
    props.isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

export const BookingdataBox: React.FC<BookingdataBoxProps> = ({ booking }) => {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuest,
    cabinPrice,
    extraPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    cabins: { name: cabinName },
  } = booking;

  if (!booking.guests) {
    return <div>No guest info available</div>;
  }

  const {
    fullName: guestName,
    email,
    country,
    countryFlag,
    nationalID,
  } = booking.guests;

  console.log('************************** booking', booking);

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in cabin <span>{cabinName}</span>
          </p>
        </div>

        {startDate && endDate && (
          <p>
            {format(new Date(startDate), 'EEE, MMM dd yyyy')}(
            {isToday(new Date(startDate))
              ? 'Today'
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
          </p>
        )}
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          {numGuest && (
            <p>
              {guestName}
              {numGuest > 1 ? ` + ${numGuest - 1} guests` : ''}
            </p>
          )}
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National Id {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? 'Yes' : 'No'}
        </DataItem>

        <Price isPaid={isPaid}>
          {totalPrice && hasBreakfast && (
            <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
              {formatCurrency(totalPrice)}

              {hasBreakfast &&
                ` (${formatCurrency(cabinPrice ?? 0)} cabin + ${formatCurrency(
                  extraPrice ?? 0
                )} breakfast)`}
            </DataItem>
          )}

          <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
      </Footer>
    </StyledBookingDataBox>
  );
};
