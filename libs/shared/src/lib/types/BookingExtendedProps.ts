import { Booking } from './supabse.types';

export type BookingExtendedxProps = Booking & {
  guests: {
    fullName: string | null;
    email: string | null;
    country: string | null;
    countryFlag: string | null;
    nationalID: string | null;
  } | null;
  cabins: { name: string };
};
