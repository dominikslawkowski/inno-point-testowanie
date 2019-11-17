import React from "react";
import { StyledButton } from "./style";

const Button = props => (
  <StyledButton {...props}>
    {props.label}
    {props.component && props.component()}
  </StyledButton>
);

export default Button;
