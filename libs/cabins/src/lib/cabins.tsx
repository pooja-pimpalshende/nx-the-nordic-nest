import { Heading, Row } from '@/shared';
import { CabinTable } from './cabinTable';
import { Addcabin } from './addCabin';
import { CabinTableOperations } from './cabinTableOperations';

export function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <Addcabin />
      </Row>
    </>
  );
}
