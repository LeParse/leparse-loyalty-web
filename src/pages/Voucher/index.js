import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PinInput from "react-pin-input";
import { toast } from "react-toastify";

import { useGlobal } from "../../contexts/global";

import { AnimatedPage, Modal, Spacer, Button } from "@leparse/ui";

import LoyaltyImg from "../../assets/images/loyalty-logo-white.png";
import { ReactComponent as CloseIcon } from "../../assets/svg/close-icon.svg";
import { ReactComponent as BackIcon } from "../../assets/svg/back-icon.svg";

import colors from "../../global/colors";

import api from "../../services/api";

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
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({});
  const [verifyModal, setVerifyModal] = useState(false);
  const [voucherObj, setVoucherObj] = useState({});

  let voucher = useRef("");

  async function confirmModal() {
    try {
      if (!voucher.current || voucher.current.length < 10) {
        return toast.warn(
          `Insira o voucher ${voucher.current.length < 10 && "completo"}`
        );
      }

      const { data } = await api.get(
        `/global/get-voucher?voucher_code=${voucher.current}`
      );

      setVoucherObj(data?.voucher);
      console.log(data?.voucher);
      setVerifyModal(true);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
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
        <BackIcon className="back" onClick={() => navigate(-1)} />
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
            width: "6rem",
            height: "6rem",
            margin: "0.25rem",
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
            padding: "2rem",
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
            <div className="modalValues">
              <div className="modalValue">
                <p>Itens (R$)</p>
                <p className="discount">- Desconto (R$)</p>
                <Spacer
                  style={{
                    margin: "1rem 0",
                  }}
                />
                <p className="total">Total (R$)</p>
              </div>
              <div className="modalValue">
                <p>{currencyFormat(ticket?.vl_subtotal_itens)}</p>
                <p className="discount">{currencyFormat(voucherObj?.value)}</p>
                <Spacer
                  style={{
                    margin: "1rem -1rem",
                  }}
                />
                <p className="total">
                  {currencyFormat(
                    ticket?.vl_subtotal_itens - voucherObj?.value
                  )}
                </p>
              </div>
            </div>
            <Button
              style={{
                width: "35%",
                position: "absolute",
                right: "2rem",
                bottom: "2rem",
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
