import React from "react";

import LogoImg from "../../assets/images/loyalty-logo-white.png";

import { Container, Logo } from "./styles";

function Header(props) {
  return (
    <Container {...props}>
      <Logo src={LogoImg} alt="Leparse Loyalty Logo" />
    </Container>
  );
}

export default Header;
