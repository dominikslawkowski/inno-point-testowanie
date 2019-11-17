import styled from "styled-components";
import { Spinner } from "../../../components";

export const StyledSpinner = styled(Spinner)`
  margin-left: auto;
  margin-right: auto;
  margin-top: calc(50vh - 50px);
`;

export const MainContainer = styled.div`
  padding: 100px;
  display: grid;
  grid-gap: 15px;
  grid-template: "back back" "main main" "goals scopes" "techno tags" "delet delete" / 1fr 1fr;

  @media (max-width: 400px) {
    padding: 15px;
  }
`;
