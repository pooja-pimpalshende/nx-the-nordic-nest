import { RouteConfig } from '@/shared';

export function checkInRoutes(): RouteConfig[] {
  return [
    {
      path: '/checkin',
      id: 'checkin',
      component: () =>
        import('./lib/checkInBooking').then((res) => ({
          default: res.CheckInBooking,
        })),
    },
  ];
}
