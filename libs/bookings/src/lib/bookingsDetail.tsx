import {
  BookingExtendedxProps,
  Button,
  ButtonGroup,
  ButtonText,
  ConfirmDelete,
  Empty,
  Heading,
  Modal,
  Row,
  Spinner,
  Tag,
  useMoveBack,
} from '@/shared';
import styled from 'styled-components';
import { useBooking } from './hooks';
import { BookingdataBox } from './bookingDataBox';
import { useNavigate } from '@tanstack/react-router';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import { useCheckout } from '@/checkin';
import { useDeleteBooking } from './hooks/useDeleteBooking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export const BookingDetail = () => {
  const { booking, isPending } = useBooking();
  const { checkout, isCheckingOut } = useCheckout('/bookings');
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  const { status, id } = booking;

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

        {status === 'checked-in' && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => {
              checkout(id);
            }}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variations="danger">Delete Booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(id, { onSettled: () => window.history.go(-1) })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};
