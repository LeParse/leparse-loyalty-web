import styled from "styled-components";
import colors from "../../global/colors";

export const Container = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  align-self: center;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  font-size: 1.7rem;
  margin-top: 1rem;
  color: ${colors.primary};
`;

export const TicketSection = styled.div`
  padding: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, auto));
  gap: 0.7rem;
`;
