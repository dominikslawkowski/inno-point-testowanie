import styled, { keyframes } from "styled-components";
import { Spinner } from "../../../components";
import Tooltip from "@material-ui/core/Tooltip";

export const StyledSpinner = styled(Spinner)`
  margin-left: auto;
  margin-right: auto;
  margin-top: calc(50vh - 50px);
`;

export const Picture = styled.img`
  width: ${({ name }) => (name === "InnoBot" ? "50px" : "40px")};
  height: ${({ name }) => (name === "InnoBot" ? "50px" : "40px")};
  border-radius: ${({ name }) => (name === "InnoBot" ? "0px" : "50px")};
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

export const Label = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-left: 50px;
  margin-top: 60px;
  color: #00336e !important;
  font-size: 24px;
  border-radius: 8px;
  padding: 7px;
  padding-bottom: 10px;

  @media (max-width: 400px) {
    display: none;
  }

  > span {
    margin-left: 10px;
  }

  transition: all 0.2s ease-in-out;
`;

export const TopBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;

  @media (max-width: 400px) {
    display: none;
  }

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

    @media (max-width: 400px) {
      display: none;
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
