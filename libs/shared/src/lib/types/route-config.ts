export type RouteConfig = {
  path: string;
  component: () => Promise<{ default: React.ComponentType }>;
};
