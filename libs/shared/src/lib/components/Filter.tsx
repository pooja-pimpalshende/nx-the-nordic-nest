import { useNavigate, useRouterState } from '@tanstack/react-router';
import styled, { css } from 'styled-components';

type FilterButtonProp = {
  $active?: boolean;
};

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<FilterButtonProp>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export function Filter({
  filterField,
  options,
}: {
  filterField: 'discount';
  options: { value: string; label: string }[];
}) {
  const navigate = useNavigate({ from: 'cabins' });
  // const search = useSearch({ from: 'cabins' });

  const search = useRouterState({
    select: (state) => state.location.search,
  }) as { discount?: string };

  const currentFilter = search.discount || options.at(0)?.value;

  function handleClick(value: string) {
    navigate({
      search: (prev: { discount: string }) => ({
        ...prev,
        [filterField]: value,
      }),
    });
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
