import styled, { keyframes } from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import { Spinner } from "../../../components";

export const Header = styled.div`
  background: var(--gradientHeader);
  width: 100%;
  height: 50px;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-left: 50px;
  margin-top: 65px;
  font-size: 24px;
  color: hsl(0, 0%, 50%);
  border-radius: 8px;
  padding: 7px;

  > div {
    display: flex;
    padding-bottom: 13px;
  }

  > div > span {
    margin-left: 10px;
  }

  @media (max-width: 400px) {
    margin-left: 10px;
  }

  transition: all 0.2s ease-in-out;
`;

export const StyledSpinner = styled(Spinner)`
  margin-left: auto;
  margin-right: auto;
  margin-top: calc(50vh - 50px);
`;

export const MainContainer = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  display: grid;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 50px;

  @media (max-width: 700px) {
    margin-left: 20px;
    margin-right: 20px;
  }

  @media (min-width: 1676px) {
    ${props => {
      switch (props.typeOfList) {
        case "block":
          return `grid-template-columns: repeat(3, 450px); 
                grid-gap: 50px;`;
        case "list":
          return `grid-gap: 30px; max-width: 1000px`;
      }
    }}
  }

  @media (max-width: 1675px) and (min-width: 1176px) {
    ${props => {
      switch (props.typeOfList) {
        case "block":
          return `grid-template-columns: repeat(2, 450px); 
                grid-gap: 50px;`;
        case "list":
          return `grid-gap: 30px; max-width: 1000px`;
      }
    }}
  }

  @media (max-width: 1175px) {
    grid-gap: 30px;
  }

  > a {
    text-decoration: none;
    color: black;
  }
`;

export const TopBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;

  > div.Searchbar {
    margin-top: 50px;
    margin-right: 60px;
    display: flex;
    align-items: center;
    width: 250px;
    height: 25px;
    background-color: rgba(255, 255, 255, 70%);
    border-radius: 50px;
    padding: 8px 15px;
    justify-self: end;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.1s ease-in-out;

    @media (max-width: 500px) {
      width: 150px;
    }

    > input {
      width: 250px;
      transition: all 0.1s ease-in-out;
    }
  }

  > div.Label {
    align-items: center;
    margin-top: 50px;
    margin-left: 60px;
    font-size: 20px;
    padding: 5px 15px;
    border-radius: 8px;
    color: gray;
    background: white;
  }
`;

export const FormContainer = styled.div`
  position: absolute;
  top: auto;
`;

export const StyledTooltip = styled(Tooltip)`
  position: fixed;
  right: 50px;
  bottom: 5%;
  transition: all 0.2s ease-in-out;

  @media (max-width: 1175px) {
    grid-gap: 30px;
  }
`;

export const StyledTypeOfList = styled(BottomNavigation)`
  width: 170px;
  right: ${({ role }) => (role !== "ADMIN" ? "50px" : "115px")};
  bottom: 5%;
  position: fixed;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-size: 5px;
  transition: all 0.2s ease-in-out;

  @media (max-width: 1175px) {
    display: none !important;
  }
`;

export const fabAddStyle = {
  background: "var(--gradientLeft1)",
  transition: "all 0.2s ease-in-out"
};

export const iconAddStyle = {
  fill: "white",
  transition: "all 0.2s ease-in-out"
};

export const fabBackStyle = {
  background: "var(--gradientLeft2)",
  transition: "all 0.2s ease-in-out"
};

export const iconBackStyle = {
  fill: "white",
  transform: "rotate(45deg)",
  transition: "all 0.2s ease-in-out"
};
