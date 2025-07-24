import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClients = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

export function renderWithQuery(ui: React.ReactNode) {
  const queryClient = createTestQueryClients();

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}
