import { Empty, Menus, Spinner, Table } from '@/shared';
import { useCabin } from './hooks';
import { Cabin } from '@/shared';
import { CabinRow } from './cabinRow';
import { useRouterState } from '@tanstack/react-router';

export function CabinTable() {
  const { cabins, isPending } = useCabin();
  const search = useRouterState({
    select: (state) => state.location.search,
  }) as { discount?: string; sortBy?: string };

  if (isPending) return <Spinner />;

  if (!cabins?.length) return <Empty resourceName="cabins" />;

  //FILTER
  const filterValue = search.discount || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins?.filter(
      (cabin) => cabin.discount !== null && cabin.discount > 0
    );

  //SortBy
  const sortBy = search.sortBy || 'StartDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    const aVal = a[field as keyof typeof a];
    const bVal = b[field as keyof typeof b];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return (aVal - bVal) * modifier;
    }
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * modifier;
    }
    return 0;
  });

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
          data={sortedCabins}
          render={(cabin: Cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
        {/* {cabins?.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))} */}
      </Table>
    </Menus>
  );
}
