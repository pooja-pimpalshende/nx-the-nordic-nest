import { RouteConfig } from '@/shared';

export function usersRoutes(): RouteConfig[] {
  return [
    {
      path: '/newUsers',
      component: () =>
        import('./lib/users').then((res) => ({ default: res.Users })),
    },
  ];
}
