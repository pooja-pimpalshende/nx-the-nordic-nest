import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from '@tanstack/react-router';

import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import Settings from './pages/Settings';
import NewUsers from './pages/Users';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import App from './app/app';

const rootRoute = createRootRoute({
  component: () => (
    <>
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
    throw redirect({ to: dashboardRoute.to, replace: true });
  },
});

const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/dashboard',
  component: Dashboard,
});

const accountRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/account',
  component: Account,
});

const bookingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/bookings',
  component: Bookings,
});

const cabinsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/cabins',
  component: Cabins,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const settingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/settings',
  component: Settings,
});

const newUsersRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/newUsers',
  component: NewUsers,
});

const routeTree = rootRoute.addChildren([
  appRoute.addChildren([
    indexRoute,
    dashboardRoute,
    accountRoute,
    bookingsRoute,
    cabinsRoute,
    settingsRoute,
    newUsersRoute,
  ]),

  loginRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
