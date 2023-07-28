import React, { useState, useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";

import { useGlobal } from "../../contexts/global";

import Header from "../../components/Header";
import Ticket from "../../components/Ticket";
import Block from "../../components/Block";
import Spacer from "../../components/Spacer";
import Input from "../../components/Input";
import NoContent from "../../components/NoContent";
import AnimatedPage from "../../components/AnimatedPage";

import { ReactComponent as SearchIcon } from "../../assets/svg/search-icon.svg";

import colors from "../../global/colors";
import { Container, Title, TicketHeader, TicketSection } from "./styles";

function Tickets() {
  const { tickets, connectToStore } = useGlobal();

  const [searchFocused, setSearchFocused] = useState(false);
  const [search, setSearch] = useState("");

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
            <div>
              <SearchIcon
                style={{
                  fill: searchFocused ? colors.primary : colors.black,
                }}
              />
              <Input
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Title>Tickets</Title>
          </TicketHeader>
          <Spacer
            style={{
              marginBottom: 0,
            }}
          />
          <AnimatePresence mode="wait">
            <m.div
              style={{
                padding: "2rem 1rem",
                display: "grid",
                width: "100%",
                gridTemplateColumns: "repeat(auto-fill, minmax(10rem, auto))",
                gap: "1rem",
                overflow: "auto",
              }}
            >
              {tickets?.map((ticket) => {
                if (
                  ticket?.ticket
                    ?.replace(" ", "")
                    ?.toLowerCase()
                    ?.includes(search.replace(" ", "").toLowerCase())
                ) {
                  return <Ticket key={ticket.venda_id} ticket={ticket} />;
                }

                return <></>;
              })}
            </m.div>
          </AnimatePresence>
          {tickets?.length === 0 && (
            <NoContent
              style={{
                position: "absolute",
              }}
            />
          )}
        </Block>
      </Container>
    </AnimatedPage>
  );
}

export default Tickets;
