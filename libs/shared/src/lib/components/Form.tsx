import styled, { css } from 'styled-components';

type FormProps = {
  type?: 'modal' | 'default';
};

export const Form = styled.form<FormProps>`
  ${(props) =>
    props.type !== 'modal' &&
    css`
      padding: 2.4rem 4rem;

      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
        width: :80rem;
    `}

    overflow:hidden;
  font-size: 1.4rem;
`;
