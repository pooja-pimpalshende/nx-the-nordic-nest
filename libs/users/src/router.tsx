import { RouteConfig } from '@/shared';

export function usersRoutes(): RouteConfig[] {
  return [
    {
      path: '/users',
      component: () =>
        import('./lib/users').then((res) => ({ default: res.Users })),
    },
  ];
}
