import styled, { keyframes } from "styled-components";

const show = keyframes`
  from {
    transform: translateY(100px);
    opacity: .2;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template: "form panel";
  animation: ${show} 0.5s;
  box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  @media (max-width: 650px) {
    border-radius: 8px;
  }

  div.Panel {
    width: 300px;
    height: 400px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background: var(--gradientTop1);

    @media (max-width: 650px) {
      display: none;
    }

    div.Title {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid hsl(0, 0%, 90%);
      font-size: 35px;
      font-weight: 600;
      font-family: "Montserrat", sans-serif;
      color: white;
      letter-spacing: 3px;

      > span {
        margin-left: 10px;
      }
    }

    div.Info {
      padding: 10px;
      color: hsl(0, 0%, 99%);
      font-size: 15px;
    }

    div.Icons {
      margin-top: 180px;
      width: 180px;
      margin-left: auto;
      margin-right: auto;
      a > img {
        width: 40px;
        height: 40px;
        margin: 10px;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
      }

      a:hover > img {
        transform: scale(1.05);
      }

      a:active > img {
        filter: brightness(1.2);
        transform: scale(1.1);
      }
    }
  }
`;

export const Form = styled.form`
  height: 380px;
  display: grid;
  grid-template: "email" 20px "." 10px "pass" 20px "button" auto "github" 35px "space" 7px / 300px;
  grid-gap: 10px;
  background-color: transparent;
  padding: 10px;
  justify-items: center;

  a.SingIn {
    grid-area: singin;
    color: #203870;
    cursor: pointer;
  }

  @media (max-width: 400px) {
    background-color: white;
    border-radius: 8px;

    grid-template: "email" 50px "pass" 50px "button" auto "github" 35px "space" 7px / 300px;
  }
`;
