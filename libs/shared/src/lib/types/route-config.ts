export type RouteConfig = {
  path: string;
  component: () => Promise<{ default: React.ComponentType }>;
  validateSearch?: (search: Record<string, any>) => Record<string, any>;
};
