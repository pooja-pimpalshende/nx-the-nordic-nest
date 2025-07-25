import { LinkComponent } from '@tanstack/react-router';
import { ReactElement } from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  variations?: keyof typeof variations;
  sizes?: keyof typeof sizes;
  children: React.ReactNode;
  type?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: ReactElement;
  as?: LinkComponent<'a'>;
  to?: string;
};

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  ${({ sizes: size }) => size && sizes[size]}
  ${({ variations: variation }) => variation && variations[variation]}
`;

export const Button = ({
  variations = 'primary',
  sizes = 'medium',
  ...props
}: ButtonProps) => {
  return <StyledButton variations={variations} sizes={sizes} {...props} />;
};
