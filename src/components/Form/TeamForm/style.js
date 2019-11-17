import styled, { keyframes } from "styled-components";
import { Spinner } from "../../../components";
import BottomNavigation from "@material-ui/core/BottomNavigation";

export const StyledSpinner = styled(Spinner)`
  position: static;
`;

const show = keyframes`
  from {
    transform: translateY(100px);
    opacity: .2;
  }
`;

export const Container = styled.div`
  width: 950px;
  height: 550px;
  display: grid;
  grid-template: "panel form" / 170px auto;
  box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.25);
  background-color: white;
  animation: ${show} 0.5s;
  transition: all 0.2s ease-in-out;

  @media (max-width: 400px) {
    width: 280px;
    height: 750px;

    grid-template: "form";
  }

  div.Panel {
    background: var(--gradientTop1);

    @media (max-width: 400px) {
      display: none;
    }
  }

  div.FormContainer {
    margin: 20px;
  }
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template:
    "title title" 35px
    "number status" 55px
    ". button" auto
    ". ." 1px
    / 3fr 2fr;
  grid-gap: 20px;
  background-color: transparent;

  @media (max-width: 400px) {
    height: 510px;
    grid-template:
      "title" 35px
      "number" 55px
      "status" 55px
      "button" auto;
    grid-gap: 20px;
  }

  div.Title {
    width: 100%;
    border-bottom: 1px solid #e2e2e2;
    font-size: 24px;
    color: #164786;
    font-weight: 500;
  }
`;

export const StyledStatusOfTeam = styled(BottomNavigation)`
  width: 170px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  font-size: 5px;
  transition: all 0.2s ease-in-out;
`;
