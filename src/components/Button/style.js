import styled, { keyframes } from "styled-components";
import { css } from "emotion";
const show = keyframes`
  from {
    transform: translateY(30px) scale(0.8);
    opacity: 0.4;
  }
`;

export const StyledButton = styled.button`
  grid-area: ${props => props.gridArea};
  width: ${props => {
    switch (props.size) {
      case "small":
        return "200px";
      case "large":
        return "300px";
      case "big":
        return "400px";
      default:
        return "300px";
    }
  }};
  height: 35px;
  background: ${({ color, disabled }) => {
    if (disabled) {
      return "hsl(0,0%,80%)";
    }
    if (color) {
      switch (color) {
        case "green":
          return "green";
        case "red":
          return "var(--gradientLeft2)";
        case "black":
          return "black";
        case "gray":
          return "gray";
        case "white":
          return "hsl(0, 50%, 90%)";
        default:
          return "var(--gradientLeft1)";
      }
    }
  }};
  background-color: ${({ bcg, disabled }) =>
    disabled ? "hsl(0,0%,80%)" : bcg};
  align-self: ${props => props.alignSelf};
  border-radius: 8px;
  color: white;
  font-size: 16px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  animation: ${show} 0.2s;

  :hover {
    ${({ disabled }) =>
      !disabled &&
      css`
        filter: brightness(1.15);
        transform: scale(1.02);
      `}
  }

  :active {
    filter: brightness(1.2);
    transform: scale(1.05);
  }
`;
