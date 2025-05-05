import { RouteConfig } from '@/shared';

export function loginRoutes(): RouteConfig[] {
  return [
    {
      path: '/login',
      component: () =>
        import('./lib/login').then((res) => ({ default: res.Login })),
    },
  ];
}
