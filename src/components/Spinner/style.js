import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  align-self: ${({ alignSelf }) => alignSelf};
`;

export const spinnerStyle = {};
