import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { spinnerStyle, Container } from "./style";

export default props => (
  <Container {...props}>
    <CircularProgress
      size={props.size ? props.size : 100}
      style={spinnerStyle}
    />
  </Container>
);
