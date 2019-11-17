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
  min-height: 200px;
  height: auto;
  display: grid;
  grid-template: "main";
  border-radius: 8px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: all 0.1s ease-in-out;
  animation: ${show} 0.3s;

  div.Main {
    display: grid;
    grid-template: "name" 40px "space" 10px;
    grid-gap: 5px;
    padding: 20px;

    div.Label {
      letter-spacing: 1px;
      border-bottom: solid 1px hsl(0, 0%, 90%);
      font-size: 25px;
    }
  }
`;

export const TechContainer = styled.span`
  cursor: pointer;
  display: flex;
  /* grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px; */
  flex-wrap: wrap;
`;

export const Technology = styled.span`
  font-size: 22px;
  height: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: ${({ theme_color }) => (theme_color ? theme_color : "black")};
  padding: 10px;
  margin-right: 10px;
  border-radius: 50px;
  border: solid 1px
    ${({ theme_color }) =>
      theme_color ? Color(theme_color).lighten(0.2) : "black"};
  margin: 5px;

  @media (max-width: 400px) {
    font-size: 16px;
    height: 20px;
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
`;
