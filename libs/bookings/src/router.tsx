import { RouteConfig } from '@/shared';

export function bookingsRoutes(): RouteConfig[] {
  return [
    {
      path: '/bookings',
      id: '/app-layout/bookings',
      component: () =>
        import('./lib/bookings').then((res) => ({
          default: res.Bookings,
        })),
      validateSearch: (search): { status?: string; page?: string } => ({
        status: search.status ?? 'all',
        page: search.page || '1',
      }),
    },
  ];
}
