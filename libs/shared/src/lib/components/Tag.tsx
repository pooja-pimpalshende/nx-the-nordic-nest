import styled from 'styled-components';

type TagProp = {
  type: 'blue' | 'green' | 'silver' | string;
};

export const Tag = styled.span<TagProp>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;
