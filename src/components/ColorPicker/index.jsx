import React from "react";
import { Container } from "./style";
import { CirclePicker } from "react-color";

export default props => (
  <Container gridArea={props.gridArea}>
    <span>Theme color</span>
    <CirclePicker {...props} />
  </Container>
);
