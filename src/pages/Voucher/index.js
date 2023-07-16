import React from "react";

import {
  Container,
  Logo,
  Text,
  BlueColor,
  SendButton,
  Footer,
  BottomText,
  VersionManager,
  DoubleChevron,
} from "./styles";
import LogoImg from "../../assets/images/admin-logo.png";
import PinInput from "react-pin-input";

function Voucher() {
  return (
    <Container>
      <Logo src={LogoImg} alt="Leparse Loyalty Logo" />
      <Text>
        Digite abaixo o <BlueColor>código</BlueColor> do seu voucher
      </Text>
      <PinInput
        length={10}
        initalValue=""
        autoSelect={true}
        type="custom"
        style={{
          marginTop: "3rem",
          marginBottom: "3rem",
        }}
        inputStyle={{
          padding: "1.6rem",
          borderRadius: "25%",
          borderColor: "#DCDCDC",
          fontSize: "2rem",
          fontFamily: "Inter",
          backgroundColor: "#E5F5FB",
          width: "3rem",
          height: "3rem",
        }}
        inputFocusStyle={{
          backgroundColor: "#CFEDF8",
        }}
      />
      <SendButton>
        <DoubleChevron />
      </SendButton>
      <Footer>
        <BottomText>Problemas?</BottomText>
        <BottomText>contact@leparse.tech</BottomText>
      </Footer>
      <VersionManager>Leparse Loyalty - v1.0.0</VersionManager>
    </Container>
  );
}

export default Voucher;
