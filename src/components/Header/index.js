import React from "react";

import { Container, Logo } from "./styles";
import LogoImg from "../../assets/images/admin-logo.png";

function Header() {
  return (
    <Container>
      <Logo src={LogoImg} alt="Leparse Loyalty Logo" />
    </Container>
  );
}

export default Header;
