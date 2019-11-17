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
  grid-template: "back back" "main main" "members members" "goals scopes" "techno tags" "verify delete" "apply ." / 50% 50%;
  @media (max-width: 400px) {
    padding: 20px;
    grid-template: "back" "main" "goals" "scopes" "techno" "tags" "verify" "delete" "apply";
  }
`;
