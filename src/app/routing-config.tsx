import { accountRoutes } from '@/account';
import { bookingsRoutes } from '@/bookings';
import { cabinsRoutes } from '@/cabins';
import { dashboardRoutes } from '@/dashboard';
import { settingsRoutes } from '@/settings';
import { usersRoutes } from '@/users';

export const creteApplicationRoute = () => {
  return [
    ...dashboardRoutes(),
    ...accountRoutes(),
    ...cabinsRoutes(),
    ...settingsRoutes(),
    ...usersRoutes(),
    ...bookingsRoutes(),
  ];
};
