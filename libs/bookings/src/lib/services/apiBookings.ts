import { Booking, supabase } from '@/shared';

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase.from('bookings').select('*');

  if (error) {
    console.log(error);
    throw new Error('Bookings could not be loaded ');
  }
  console.log(data);
  return data;
}
