import { Spinner } from '@/shared';
import { useUser } from '@/users';
import { useNavigate } from '@tanstack/react-router';
import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function ProtectedRoute({ children }: { children: ReactElement }) {
  const navigate = useNavigate();

  //1.Load authenticated user
  const { user, isPending, isAuthenticated } = useUser();

  //2.If there is no authenticated user redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate({ to: '/' });
  }, [isAuthenticated, isPending, navigate]);

  //3.While loading show spinner
  if (isPending)
    <FullPage>
      <Spinner />
    </FullPage>;

  //4.If there is user render app
  if (isAuthenticated) return children;
}
