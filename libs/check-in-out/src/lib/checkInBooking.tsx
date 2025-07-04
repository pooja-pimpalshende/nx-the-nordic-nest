import styled from 'styled-components';
import {
  BookingExtendedxProps,
  Button,
  ButtonGroup,
  ButtonText,
  CheckBox,
  formatCurrency,
  Heading,
  Row,
  Spinner,
  useMoveBack,
} from '@/shared';
import { BookingdataBox, useBooking } from '@/bookings';
import { useEffect, useState } from 'react';
import { useCheckin } from './hooks';
import { useSettings } from '@/settings';

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckInBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isPending } = useBooking();

  const { settings, isPending: isLoadingSettings } = useSettings();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  if (isPending && isLoadingSettings) return <Spinner />;
  if (!booking) return;
  console.log('@@@@@@@@@@@@@@@@@@@@@@@ Booking', booking);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuest,
    hasBreakfast,
    numNights,
  } = booking as BookingExtendedxProps;

  const optionalBreakfastPrice =
    (settings?.breakfastPrice ?? 0) * (numNights ?? 0) * (numGuest ?? 0);

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: (totalPrice ?? 0) + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  };
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingdataBox booking={booking as BookingExtendedxProps} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
            disabled={false}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </CheckBox>
        </Box>
      )}

      <CheckBox
        checked={confirmPaid}
        onChange={() => setConfirmPaid((confirm) => !confirm)}
        id={confirmPaid ? 'confirmed' : 'unconfirmed'}
        disabled={confirmPaid || isCheckingIn}
      >
        I confirm that {guests?.fullName ?? ''} has paid the total amount of{' '}
        {!addBreakfast
          ? formatCurrency(totalPrice ?? 0)
          : `${formatCurrency(
              (totalPrice ?? 0) + optionalBreakfastPrice
            )} (${formatCurrency(totalPrice ?? 0)} + ${formatCurrency(
              optionalBreakfastPrice
            )})`}
      </CheckBox>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckInBooking;
