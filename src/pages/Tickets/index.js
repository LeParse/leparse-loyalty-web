import React from "react";

import { Container, Title, TicketSection } from "./styles";
import Header from "../../components/Header";
import Ticket from "../../components/Ticket";

function Tickets() {
  return (
    <Container>
      <Header />
      <Title>Tickets</Title>
      <TicketSection>
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
      </TicketSection>
    </Container>
  );
}

export default Tickets;
