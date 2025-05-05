import { RouteConfig } from '@/shared';

export function bookingsRoutes(): RouteConfig[] {
  return [
    {
      path: '/bookings',
      component: () =>
        import('./lib/bookings').then((res) => ({
          default: res.Bookings,
        })),
    },
  ];
}
