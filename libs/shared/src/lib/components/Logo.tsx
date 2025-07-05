import styled from 'styled-components';

const StyledLogo = styled.div`
  text-align: center;
`;
const Img = styled.img`
  height: 18rem;
  width: auto;
`;
export const Logo = () => {
  const src = '/logo-light.png';
  return (
    <StyledLogo>
      <Img src={src} alt="logo" />
    </StyledLogo>
  );
};
