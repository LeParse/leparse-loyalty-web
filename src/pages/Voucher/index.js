import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import PinInput from "react-pin-input";
import { toast } from "react-toastify";

import { useGlobal } from "../../contexts/global";

import AnimatedPage from "../../components/AnimatedPage";
import Modal from "../../components/Modal";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";

import LoyaltyImg from "../../assets/images/loyalty-logo-white.png";
import { ReactComponent as CloseIcon } from "../../assets/svg/close-icon.svg";

import colors from "../../global/colors";

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

function Voucher() {
  const { tickets, socket } = useGlobal();
  const [searchParams] = useSearchParams();

  const [ticket, setTicket] = useState({});
  const [verifyModal, setVerifyModal] = useState(false);

  let voucher = useRef("");

  function confirmModal() {
    if (!voucher.current || voucher.current.length < 10) {
      return toast.warn(
        `Insira o voucher ${voucher.current.length < 10 && "completo"}`
      );
    }

    setVerifyModal(true);
  }

  function applyVoucher() {
    socket.emit("validate-voucher-req", {
      voucher_code: voucher.current,
      operacao_id: ticket?.operacao_id,
    });
  }

  function currencyFormat(num = 200) {
    return num
      .toFixed(2)
      .replace(".", ",")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        confirmModal();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(() => {
    const t = tickets.find(
      (t) => t?.venda_id === searchParams.get("ticket_id")
    );
    setTicket(t);
  }, []);

  return (
    <AnimatedPage>
      <Container>
        <Logo src={LoyaltyImg} alt="Leparse Loyalty Logo" />
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
          onChange={(v) => {
            voucher.current = v.toUpperCase();
          }}
          inputStyle={{
            padding: "1.6rem",
            borderRadius: "25%",
            borderColor: "#DCDCDC",
            fontSize: "2rem",
            fontFamily: "Raleway",
            fontWeight: "700",
            backgroundColor: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(1rem)",
            color: colors.white,
            width: "3rem",
            height: "3rem",
          }}
          inputFocusStyle={{
            backgroundColor: "rgba(207, 237, 248, 0.75)",
          }}
        />
        <SendButton onClick={confirmModal}>
          <DoubleChevron />
        </SendButton>
        <Footer>
          <BottomText>Problemas?</BottomText>
          <BottomText>contact@leparse.tech</BottomText>
        </Footer>
        <VersionManager>Leparse Loyalty - v1.0.0</VersionManager>
        <Modal
          shouldCloseOnOverlayClick
          to="left"
          overlayStyle={{
            backgroundColor: "transparent",
            backdropFilter: "blur(0.5rem)",
          }}
          contentStyle={{
            width: "35%",
            height: "auto",
            position: "absolute",
            right: "2rem",
            overflow: "hidden",
          }}
          isOpen={verifyModal}
          setIsOpen={setVerifyModal}
        >
          <div className="modalHeader">
            <p>
              {ticket?.ticket &&
                ticket?.ticket[0]?.toUpperCase() + ticket?.ticket?.substring(1)}
            </p>
            <CloseIcon onClick={() => setVerifyModal(false)} />
          </div>
          <Spacer />
          <div className="modalFooter">
            <div className="modalValue">
              <p>R$</p>
              <p>{currencyFormat(ticket?.vl_subtotal_itens)}</p>
            </div>
            <Button
              style={{
                width: "50%",
              }}
              onClick={applyVoucher}
            >
              Aplicar voucher
            </Button>
          </div>
        </Modal>
      </Container>
    </AnimatedPage>
  );
}

export default Voucher;
