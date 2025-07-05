import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from '@tanstack/react-router';

import { dashboardRoutes } from '@/dashboard';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import App from './app/app';
import { creteApplicationRoute } from './app/routing-config';
import { createRoutes } from './app/create-routes';
import { loginRoutes } from '@/login';
import { GlobalStyles } from '@/shared';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <GlobalStyles />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app-layout',
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/',
  loader: () => {
    throw redirect({ to: dashboardRoutes()[0].path, replace: true });
  },
});

const routeTree = rootRoute.addChildren([
  appRoute.addChildren([
    indexRoute,
    ...createRoutes(appRoute, creteApplicationRoute()),
  ]),
  ...createRoutes(rootRoute, loginRoutes()),
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
