import Header from '../ui/Header';
import GlobalStyles from '../styles/GlobalStyles';
import styled from 'styled-components';
import Sidebar from '../ui/Sidebar';
import { Outlet } from '@tanstack/react-router';

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

export function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Header />
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </StyledApp>
    </>
  );
}

export default App;
