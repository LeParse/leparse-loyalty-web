import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import { useDebounce } from "../../utils/debounce.utils";

import { useGlobal } from "../../contexts/global";

import { SearchBar, AnimatedPage, Spacer } from "@leparse/ui";

import Header from "../../components/Header";
import Ticket from "../../components/Ticket";
import Block from "../../components/Block";
import NoContent from "../../components/NoContent";

import { Container, Title, TicketHeader } from "./styles";

function Tickets() {
  const { tickets, connectToStore } = useGlobal();

  const [search, setSearch] = useDebounce("");

  useEffect(() => {
    connectToStore();
  }, []);

  return (
    <AnimatedPage>
      <Container>
        <Header />
        <Block
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            alignSelf: "center",
            paddingBottom: 0,
          }}
        >
          <TicketHeader>
            <Title>Tickets</Title>
            <SearchBar
              style={{
                position: "absolute",
                left: 0,
              }}
              onChange={(e) => setSearch(e.target.value)}
              inverted
            />
          </TicketHeader>
          <Spacer
            style={{
              marginBottom: 0,
            }}
          />
          <div
            style={{
              padding: "2rem 1rem",
              display: "grid",
              width: "100%",
              gridTemplateColumns: "repeat(auto-fill, minmax(10rem, auto))",
              gap: "1rem",
              overflow: "auto",
            }}
          >
            <AnimatePresence>
              {tickets?.map(
                (ticket) =>
                  ticket?.ticket
                    ?.replace(" ", "")
                    ?.toLowerCase()
                    ?.includes(search.replace(" ", "").toLowerCase()) && (
                    <Ticket key={ticket.venda_id} ticket={ticket} />
                  )
              )}
              {tickets?.filter((ticket) =>
                ticket?.ticket
                  ?.replace(" ", "")
                  ?.toLowerCase()
                  ?.includes(search.replace(" ", "").toLowerCase())
              )?.length === 0 && (
                <NoContent
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
                    layout: {
                      duration: 0.2,
                    },
                  }}
                  style={{
                    position: "absolute",
                    top: "2rem",
                    left: 0,
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </Block>
      </Container>
    </AnimatedPage>
  );
}

export default Tickets;
