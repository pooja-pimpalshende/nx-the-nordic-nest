import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Select } from './Select';
import { Search, useSearchParams } from 'react-router-dom';

export function SortBy({
  options,
}: {
  options: { value: string; label: string }[];
}) {
  const navigate = useNavigate({ from: 'cabins' });

  const search = useRouterState({
    select: (state) => state.location.search,
  }) as { sortBy?: string };

  const sortBy = search.sortBy || '';

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    navigate({
      search: (prev: { sortBy: string }) => ({
        ...prev,
        sortBy: e.target.value,
      }),
    });
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    ></Select>
  );
}
