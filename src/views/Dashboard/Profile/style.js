import styled, { keyframes } from "styled-components";

const show = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0.4;
  }
`;

export const Picture = styled.img`
  grid-area: icon;
  width: 100px;
  height: 100px;
  justify-self: center;
  border-radius: 50px;
  /* border: solid 4px hsl(0, 0%, 80%); */
  border: solid 4px #0053b3;
  margin: 20px;
  margin-top: 25px;
  animation: ${show} 0.2s linear;
`;

export const tableStyle = {
  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.1) !important",
  fontSize: "18px"
};

export const iconStyle = {
  gridArea: "icon",
  width: "100px",
  border: "solid 4px #0053b3",
  borderRadius: "50px",
  height: "100px",
  fontWeight: "100",
  justifySelf: "center",
  color: "hsl(0, 0%, 80%)"
};
