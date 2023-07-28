import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-family: Raleway;
    font-size: 2rem;
  }

  .controls {
    display: flex;
    flex-direction: column;

    align-items: flex-end;
    justify-content: center;

    gap: 2rem;
  }
`;
