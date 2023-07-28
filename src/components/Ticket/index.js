import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";

import { Container } from "./styles";

function Ticket({ ticket }) {
  const navigate = useNavigate();

  function onClick() {
    navigate(`/voucher?ticket_id=${ticket?.venda_id}`);
  }

  return (
    <m.div
      initial={{
        y: "2.5rem",
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: "-2.5rem",
        opacity: 0,
      }}
      transition={{
        type: "spring",
        mass: 0.4,
      }}
    >
      <Container onClick={onClick}>
        <p>
          {ticket?.ticket &&
            ticket?.ticket[0].toUpperCase() + ticket?.ticket.substring(1)}
        </p>
      </Container>
    </m.div>
  );
}

export default Ticket;
