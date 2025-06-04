import { Menus, Spinner, Table } from '@/shared';
import { useCabin } from './hooks';
import { Cabin } from '@/shared';
import { CabinRow } from './cabinRow';
import { useSearch } from '@tanstack/react-router';
import { cabinsRoutes } from '../router';

export function CabinTable() {
  const { cabins, isPending } = useCabin();
  const search = useSearch({ from: cabinsRoutes.id });

  if (isPending) return <Spinner />;

  const { discount } = search;
  const filterValue = discount || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins?.filter(
      (cabin) => cabin.discount !== null && cabin.discount > 0
    );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin: Cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
        {/* {cabins?.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))} */}
      </Table>
    </Menus>
  );
}
