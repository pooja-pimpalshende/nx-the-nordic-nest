import { RouteConfig } from '@/shared';

export function checkInRoutes(): RouteConfig[] {
  return [
    {
      path: '/checkin',
      id: 'checkin',
      component: () =>
        import('./lib/checkin').then((res) => ({
          default: res.Checkin,
        })),
    },
    {
      path: '/checkin/$bookingId',
      id: '/app-layout/checkin/$bookingId',
      component: () =>
        import('./lib/checkin').then((res) => ({
          default: res.Checkin,
        })),
    },
  ];
}
