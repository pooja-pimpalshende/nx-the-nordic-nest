import { RouteConfig } from '@/shared';

export function accountRoutes(): RouteConfig[] {
  return [
    {
      path: '/account',
      component: () =>
        import('./lib/account').then((res) => ({
          default: res.Account,
        })),
    },
  ];
}
