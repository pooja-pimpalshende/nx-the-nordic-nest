import { RouteConfig } from '@/shared';

export function settingsRoutes(): RouteConfig[] {
  return [
    {
      path: '/settings',
      component: () =>
        import('./lib/settings').then((res) => ({
          default: res.Settings,
        })),
    },
  ];
}
