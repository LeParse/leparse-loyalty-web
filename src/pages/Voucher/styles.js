import styled from "styled-components";
import colors from "../../global/colors";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .back {
    position: absolute;
    top: 0;
    left: 0;

    width: 2rem;
    height: 2rem;
    fill: ${colors.white};
    cursor: pointer;

    padding: 2rem;

    transition: 100ms ease;

    &:hover {
      transform: scale(1.05) translateX(-0.25rem);
    }
  }

  .modalHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-family: Raleway;
      font-size: 2rem;
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
      fill: ${colors.black};

      cursor: pointer;

      transition: 100ms ease;

      &:hover {
        transform: translateY(-0.25rem) scale(1.05);
        opacity: 1;
        fill: ${colors.red};
      }
    }
  }

  .modalFooter {
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    p {
      font-family: Raleway;
      color: ${colors.black};
    }

    .total {
      font-weight: 700;
      font-size: 1.25rem;
    }
  }

  .modalValues {
    display: grid;

    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .modalValue {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;

    .discount {
      color: ${colors.red};
    }
  }
`;

export const Logo = styled.img`
  height: 7rem;
  margin-top: 3rem;
`;

export const Text = styled.p`
  font-family: Raleway;
  font-size: 2rem;
  color: ${colors.white};
`;

export const BlueColor = styled.span`
  font-weight: 700;
  color: ${colors.lightBlue};
`;

export const SendButton = styled.div`
  height: 5rem;
  width: 5rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(0.5rem);
  transition: 100ms ease;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.75);
  }
`;

export const DoubleChevron = styled(HiOutlineChevronDoubleRight)`
  width: 3rem;
  height: 3rem;
  color: ${colors.grey};
  transition: 100ms ease;
`;

export const Footer = styled.section`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

export const BottomText = styled.p`
  font-family: Raleway;
  font-size: 0.8rem;
  color: ${colors.grey};
  text-align: center;
`;

export const VersionManager = styled.p`
  font-family: Raleway;
  font-size: 0.8rem;
  color: ${colors.gray};
  text-align: center;
  position: absolute;
  bottom: 0.7rem;
`;
