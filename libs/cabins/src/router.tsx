import { RouteConfig } from '@/shared';

export function cabinsRoutes(): RouteConfig[] {
  return [
    {
      path: '/cabins',
      component: () =>
        import('./lib/cabins').then((res) => ({
          default: res.Cabins,
        })),
    },
  ];
}
