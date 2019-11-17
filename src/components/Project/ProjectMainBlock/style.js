import styled, { keyframes } from "styled-components";
import Color from "color";

const show = keyframes`
  from {
    transform: translateY(30px) scale(0.8);
    opacity: 0.4;
  }
`;

export const Container = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  height: auto;
  display: grid;
  grid-template:
    "panel main"
    / 120px auto;
  border-radius: 8px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: all 0.1s ease-in-out;
  /* margin-top: var(--blockMargin); */
  animation: ${show} 0.3s;

  @media (max-width: 400px) {
    grid-template: "panel";
  }

  div.Main {
    background-color: white;
    display: grid;
    grid-template: "name" 60px "desc";
    grid-gap: 20px;
    padding: 20px;
    padding-bottom: 60px;
    border-radius: 8px;

    @media (max-width: 400px) {
      padding: 10;
      grid-template: "name" 40px "desc";
    }

    div.Name {
      letter-spacing: 3px;
      border-bottom: solid 1px hsl(0, 0%, 90%);
      font-size: 45px;
      @media (max-width: 400px) {
        font-size: 30px;
      }
    }

    div.Desc {
      color: gray;
      padding-right: 30%;
      font-size: 20px;
      cursor: pointer;

      > span {
        height: 25px;
        padding-right: 5px;
        font-size: 25px;
        line-height: 25px;
        margin-right: 5px;
        border-right: 1px solid black;
        color: black;
      }

      @media (max-width: 400px) {
        font-size: 16px;
        padding-right: 0;
      }
    }

    a {
      justify-self: end;
      text-decoration: none;
      color: black;
    }

    div.Stack {
    }
  }
`;

export const Panel = styled.div`
  height: 100%;
  background: ${({ theme_color }) =>
    theme_color
      ? `linear-gradient(to left, ${theme_color}, ${Color(theme_color).darken(
          0.2
        )})`
      : "var(--gradientLeft1)"};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  @media (max-width: 400px) {
    display: none;
  }
`;
