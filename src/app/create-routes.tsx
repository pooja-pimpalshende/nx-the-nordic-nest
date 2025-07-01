import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { RouteConfig } from '@/shared';

export function createRoutes(appRoute: any, routes: RouteConfig[]) {
  return routes.map(({ path, component, children }) => {
    const route = createRoute({
      path,
      component: lazyRouteComponent(component),
      getParentRoute: () => appRoute,
    });

    if (children && children.length > 0) {
      const childRoutes = createRoutes(route, children);
      route.addChildren(childRoutes);
    }
    return route;
  });
}
