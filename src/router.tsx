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
import { Toaster } from 'react-hot-toast';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <GlobalStyles />
      <Outlet />
      <TanStackRouterDevtools />

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
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
