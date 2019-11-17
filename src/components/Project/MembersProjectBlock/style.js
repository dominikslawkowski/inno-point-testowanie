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
  height: 130px;
  display: grid;
  grid-template: "table";
  border-radius: 8px;
  box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.25);
  transition: all 0.1s ease-in-out;
  animation: ${show} 0.3s;
  background-color: white;

  @media (max-width: 400px) {
    display: none;
  }

  > div.Panel {
    width: 150px;
    height: 100%;
    background: var(--gradientLeft1);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    text-align: center;
    font-size: 24px;
    color: white;
  }

  > div.MembersContainer {
    height: 100%;
    display: flex;
    justify-content: space-around;

    > div.Member {
      margin: 10px;
      align-items: center;
      display: grid;
      grid-template: "icon" 80px "name" 30px;

      > div.Data {
        text-align: center;
      }
    }
  }
`;

export const Panel = styled.div`
  background: ${({ theme_color }) =>
    theme_color
      ? `linear-gradient(to left, ${theme_color}, ${Color(theme_color).darken(
          0.2
        )})`
      : "var(--gradientLeft1)"};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const Picture = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  border: solid 4px ${({ theme_color }) => theme_color};
  margin: 20px;
  margin-top: 25px;
`;

export const tableStyle = {
  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.1) !important",
  fontSize: "18px"
};

export const iconStyle = {
  width: "40px",
  height: "40px",
  fontWeight: "100",
  justifySelf: "center"
};
