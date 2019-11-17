import styled, { keyframes } from "styled-components";
import Color from "color";

const show = keyframes`
  from {
    transform: translateY(30px) scale(0.8);
    opacity: 0.4;
  }
`;

export const Element = styled.div`
  height: 100%;
  display: grid;
  cursor: pointer;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
  animation: ${show} 0.3s;
  transition: all 0.1s ease-in-out;
  background-color: white;

  @media (max-width: 400px) {
    width: 270px;
  }

  @media (min-width: 700px) {
    min-height: 192px;
  }

  @media (min-width: 600px) {
    min-height: 160px;
  }

  :hover {
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.2);
  }

  :active {
    transform: scale(1.02);
  }

  div.Main {
    display: grid;
    grid-template: "title members" 30px "project project" 30px "status status" 30px;
    padding: 15px;
    grid-gap: 15px;
    align-items: center;

    @media (max-width: 700px) {
      grid-template: "title" 25px "members" 30px "project" 30px "status" 30px;
    }

    @media (max-width: 560px) {
      font-size: 18px;
    }

    @media (max-width: 500px) {
      grid-template: "title" 25px "members" 30px;
    }

    @media (max-width: 460px) {
      grid-template: "title" 15px "members" 10px;
    }

    div.Title {
      grid-area: title;
      display: flex;
      align-items: center;
      letter-spacing: 1px;
      font-size: 20px;

      @media (max-width: 560px) {
        font-size: 18px;
      }

      @media (max-width: 460px) {
        font-size: 15px;
      }

      > span {
        margin-left: 10px;
      }
    }
    div.Name {
      grid-area: name;
      letter-spacing: 1px;
      font-size: 24px;
    }

    div.Project {
      grid-area: project;
      font-family: Arial, Helvetica, sans-serif;
      color: hsl(0, 0%, 60%);

      @media (max-width: 500px) {
        display: none;
      }
    }

    div.Members {
      grid-area: members;
      height: 30px;
      width: 40px;
      display: flex;
      fill: gray;
      padding: 0px 5px;
      align-items: center;
      justify-self: end;
      border: 1px solid hsl(0, 0%, 90%);
      border-radius: 8px;

      @media (max-width: 700px) {
        justify-self: start;
        height: 30px;
      }

      @media (max-width: 460px) {
        display: none;
      }

      > span {
        width: 20px;
        color: gray;

        @media (max-width: 460px) {
          width: 10px;
        }
      }

      > img {
        width: 18px;
        margin-left: 5px;

        @media (max-width: 460px) {
          width: 9px;
        }
      }
    }

    > div.Status {
      color: hsl(0, 0%, 60%);
      display: flex;
      align-items: center;

      @media (max-width: 500px) {
        display: none;
      }
    }
  }
`;

export const Panel = styled.div`
  height: 100%;
  width: 100px;
  background: ${({ theme_color }) =>
    theme_color
      ? `linear-gradient(to left, ${theme_color}, ${Color(theme_color).darken(
          0.2
        )})`
      : "hsl(0, 0%, 50%)"};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const Tag = styled.span`
  padding: 5px 7px;
  margin: 0 5px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  color: gray;
  background-color: hsl(0, 0%, 95%);
`;

export const Picture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: solid 2px #0053b3;
`;

export const iconStyle = {
  width: "40px",
  height: "40px",
  fill: "gray"
};
