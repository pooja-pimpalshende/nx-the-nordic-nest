import styled from 'styled-components';
import { Header, Sidebar } from './components';
import { Outlet } from '@tanstack/react-router';

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

export function Layout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
