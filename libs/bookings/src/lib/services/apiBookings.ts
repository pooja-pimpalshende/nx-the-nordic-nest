import { Booking, supabase } from '@/shared';

export async function getBookings({
  filter,
  sortBy,
}: Record<string, any> = {}): Promise<Booking[]> {
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)');

  if (filter) query = query.eq(filter.field, filter.value);
  // query = query[filter.method || 'eq'](filter.field, filter.value);
  console.log('sortBy =>', sortBy);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error('Bookings could not be loaded ');
  }
  console.log(data);
  return data;
}
