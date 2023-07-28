import styled from "styled-components";

import colors from "../../global/colors";

export const Container = styled.div`
  width: 10rem;
  height: 9rem;
  border-radius: 25px;
  background-color: ${colors.primary};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: 100ms ease;

  padding: 1rem;
  overflow: hidden;

  p {
    color: ${colors.white};
    font-family: Raleway;
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    width: 100%;
    overflow: hidden;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 1rem -0.1rem ${colors.primary};
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
