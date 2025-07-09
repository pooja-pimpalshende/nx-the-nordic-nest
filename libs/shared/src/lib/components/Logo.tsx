import styled from 'styled-components';
import { useDarkMode } from '../context';

const StyledLogo = styled.div`
  text-align: center;
`;
const Img = styled.img`
  height: 18rem;
  width: auto;
`;
export const Logo = () => {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? '/logo-dark.png' : '/logo-light.png';
  return (
    <StyledLogo>
      <Img src={src} alt="logo" />
    </StyledLogo>
  );
};
