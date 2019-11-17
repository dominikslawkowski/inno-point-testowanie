import styled from "styled-components";
import { Spinner } from "../../../components";

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
    grid-template-columns: repeat(3, 450px);
    grid-gap: 50px;
  }

  @media (max-width: 1675px) and (min-width: 1176px) {
    grid-template-columns: repeat(2, 450px);
    grid-gap: 50px;
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
`;
