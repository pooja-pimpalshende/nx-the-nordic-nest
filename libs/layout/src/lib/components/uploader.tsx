import { Button, subtractDates, supabase } from '@/shared';
import { useState } from 'react';

import { guests } from '@/cabins';
import { cabins } from '@/cabins';
import { bookings } from '@/bookings';
import { isFuture, isPast, isToday } from 'date-fns';

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
  const { data: guestIds } = await supabase
    .from('guests')
    .select('id')
    .order('id');
  const allGuestIds = guestIds?.map((cabin) => cabin.id) ?? [];

  const { data: cabinIds } = await supabase
    .from('cabins')
    .select('id')
    .order('id');
  const allCabinIds = cabinIds?.map((cabin) => cabin.id) ?? [];

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);

    let cabinPrice = 0;
    if (cabin?.regularPrice && cabin.discount) {
      cabinPrice = numNights * (cabin?.regularPrice - cabin?.discount);
    }

    const extraPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuest
      : 0;
    const totalPrice = cabinPrice + extraPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = 'checked-out';
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = 'unconfirmed';
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-in';

    return {
      ...booking,
      numNights,
      cabinPrice,
      extraPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });
  console.log(finalBookings);

  const { error } = await supabase.from('bookings').insert(finalBookings);
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
    <div
      style={{
        marginTop: 'auto',
        backgroundColor: '#e0e7ff',
        padding: '8px',
        borderRadius: '5px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <h3>SAMPLE DATA</h3>
      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>
      <Button>Upload bookings ONLY</Button>
    </div>
  );
}
