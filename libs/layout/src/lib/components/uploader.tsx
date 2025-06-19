import { Button, supabase } from '@/shared';
import { useState } from 'react';

import { guests } from '@/cabins';
import { cabins } from '@/cabins';
import { bookings } from '@/bookings';

async function deleteGuests() {
  const { error } = await supabase.from('guests').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from('cabins').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from('bookings').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from('guests').insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from('cabins').insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  const { error } = await supabase.from('bookings').insert(bookings);
  if (error) console.log(error.message);
}

export function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    //Booking needs to be delated first
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    //Bookings needs to be created last
    await createGuests();
    await createCabins();
    await createBookings();
  }
  return (
    <div>
      <h3>SAMPLE DATA</h3>
      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>
      <Button>Upload bookings ONLY</Button>
    </div>
  );
}
