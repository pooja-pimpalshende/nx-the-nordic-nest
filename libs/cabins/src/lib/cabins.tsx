import { Heading, Row } from '@/shared';
import { CabinTable } from './cabinTable';
import { Addcabin } from './addCabin';

export function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Addcabin />
      </Row>
    </>
  );
}
