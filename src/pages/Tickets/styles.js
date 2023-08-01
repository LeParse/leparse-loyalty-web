import styled from "styled-components";

import colors from "../../global/colors";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const Title = styled.h2`
  align-self: center;
  justify-self: center;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  font-size: 1.7rem;
  margin-top: 1rem;
  color: ${colors.primary};
`;

export const TicketHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  position: relative;
`;

export const TicketSection = styled.div`
  padding: 2rem 1rem;
  background-color: red;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(10rem, auto));
  gap: 1rem;
  overflow: auto;
`;
