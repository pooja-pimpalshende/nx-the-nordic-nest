import styled from "styled-components";
import logo from "../../public/logo.png";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src={logo} alt="logo" />
    </StyledLogo>
  );
}

export default Logo;
