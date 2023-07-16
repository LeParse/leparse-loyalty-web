import styled from "styled-components";
import colors from "../../global/colors";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

export const Container = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img`
  height: 7rem;
  margin-top: 3rem;
`;

export const Text = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 2rem;
`;

export const BlueColor = styled.span`
  color: ${colors.lightBlue};
`;

export const SendButton = styled.div`
  height: 3rem;
  width: 3rem;
  padding: 1.6rem;
  border-radius: 25%;
  background-color: ${colors.gray};
  transition: 400ms;
  /* &:hover {
    background-color: ${colors.grey};
  } */
`;

export const Footer = styled.section`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

export const BottomText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.8rem;
  color: ${colors.grey};
  text-align: center;
`;

export const VersionManager = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.8rem;
  color: ${colors.gray};
  text-align: center;
  position: absolute;
  bottom: 0.7rem;
`;

export const DoubleChevron = styled(HiOutlineChevronDoubleRight)`
  width: 3rem;
  height: 3rem;
  color: ${colors.grey};
  transition: 400ms;
`;
