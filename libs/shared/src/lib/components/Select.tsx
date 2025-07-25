import { ChangeEvent, SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

type SelectProps = {
  type?: string;
};

const StyledSelect = styled.select<SelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export function Select({
  options,
  value,
  type,
  onChange,
  ...props
}: {
  options: { value: string; label: string }[];
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <StyledSelect value={value} {...props} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
