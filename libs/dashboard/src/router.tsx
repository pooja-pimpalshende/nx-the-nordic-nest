import { RouteConfig } from '@/shared';
export function dashboardRoutes(): RouteConfig[] {
  return [
    {
      path: '/dashboard',
      component: () =>
        import('./lib/dashboard').then((mod) => ({ default: mod.Dashboard })),
    },
  ];
}
