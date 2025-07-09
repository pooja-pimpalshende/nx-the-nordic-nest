import { Logout } from '@/login';
import { ButtonIcon } from '@/shared';
import { useNavigate } from '@tanstack/react-router';
import { HiOutlineUser } from 'react-icons/hi2';
import styled from 'styled-components';
import { DarkModeToggle } from './DarkModeToggle';

const StyledHeader = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <li>
        <ButtonIcon onClick={() => navigate({ to: '/account' })}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeader>
  );
}
