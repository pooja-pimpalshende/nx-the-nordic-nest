export type RouteConfig = {
  path: string;
  id: string;
  component: () => Promise<{ default: React.ComponentType }>;
  validateSearch?: (search: Record<string, string>) => Record<string, string>;
};
