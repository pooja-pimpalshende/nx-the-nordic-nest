import { RouteConfig } from '@/shared';

export function loginRoutes(): RouteConfig[] {
  return [
    {
      path: '/login',
      id: 'login',
      component: () =>
        import('./lib/login').then((res) => ({ default: res.Login })),
    },
  ];
}
