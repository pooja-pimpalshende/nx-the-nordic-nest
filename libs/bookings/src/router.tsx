import { RouteConfig } from '@/shared';

export function bookingsRoutes(): RouteConfig[] {
  return [
    {
      path: '/bookings',
      id: 'bookings',
      component: () =>
        import('./lib/bookings').then((res) => ({
          default: res.Bookings,
        })),
      validateSearch: (search): { status?: string } => ({
        status: search.status ?? 'all',
      }),
    },
  ];
}
