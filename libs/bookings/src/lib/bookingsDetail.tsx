import {
  Button,
  ButtonGroup,
  ButtonText,
  Heading,
  Row,
  Spinner,
  Tag,
  useMoveBack,
} from '@/shared';
import styled from 'styled-components';
import { useBooking } from './hooks';
import { BookingdataBox } from './bookingDataBox';
import { useNavigate } from '@tanstack/react-router';
import { BookingExtendedxProps } from './types';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export const BookingDetail = () => {
  const { booking, isPending } = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;

  if (!booking) return 'No booking';

  const { status, id } = booking;
  console.log('status, bookingId', status, id);

  const statusToTagName: Record<
    'unconfirmed' | 'checked-in' | 'checked-out',
    string
  > = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (
    status !== 'unconfirmed' &&
    status !== 'checked-in' &&
    status !== 'checked-out'
  ) {
    return 'Invalid booking status';
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingdataBox booking={booking as BookingExtendedxProps} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate({ to: `/checkin/${id}` })}>
            Check in
          </Button>
        )}
        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};
