import {
  Button,
  ButtonGroup,
  ButtonText,
  Heading,
  Row,
  Tag,
  useMoveBack,
} from '@/shared';
import styled from 'styled-components';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export const BookingDetail = () => {
  const booking = {};
  const status = 'checked-in';

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #X</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {/* <BookingDataBox booking={booking} /> */}

      <ButtonGroup>
        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};
