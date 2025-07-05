import { GlobalStyles } from '@/shared';
import styled from 'styled-components';
import { Layout } from '@/layout';

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

export function App() {
  return (
    <>
      <StyledApp>
        <Layout />
      </StyledApp>
    </>
  );
}

export default App;
