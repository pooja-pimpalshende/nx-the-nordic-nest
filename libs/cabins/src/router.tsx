import { RouteConfig } from '@/shared';

export function cabinsRoutes(): RouteConfig[] {
  return [
    {
      path: '/cabins',
      id: 'cabins',
      component: () =>
        import('./lib/cabins').then((res) => ({
          default: res.Cabins,
        })),
      validateSearch: (search): { discount?: string } => ({
        discount: search.discount ?? 'all',
      }),
    },
  ];
}
