import styled, { css } from 'styled-components';

interface RowProps {
  type?: 'horizontal' | 'vertical' | string;
  children?: React.ReactNode;
}

const StyledRow = styled.div<RowProps>`
  display: flex;

  ${(props) =>
    props.type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

export const Row = ({ type = 'vertical', ...props }: RowProps) => {
  return <StyledRow type={type} {...props} />;
};
