import styled from 'styled-components';

type CheckBoxProps = {
  checked: boolean | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  disabled: boolean | undefined;
  id: string | undefined;
  children: string[] | string | null;
};

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type='checkbox'] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type='checkbox']:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

export const CheckBox = ({
  checked,
  onChange,
  disabled = false,
  id,
  children,
}: CheckBoxProps) => {
  return (
    <StyledCheckbox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ''}>{children}</label>
    </StyledCheckbox>
  );
};
