import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { RouteConfig } from '@/shared';

export function createRoutes(appRoute: any, routes: RouteConfig[]) {
  return routes.map(({ path, component }) =>
    createRoute({
      path,
      component: lazyRouteComponent(component),
      getParentRoute: () => appRoute,
    })
  );
}
