import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
  background: url("photos/bcg-new.png");
  background-position: center;
  background-size: ${({ loading }) => (!loading ? "100% 100%" : "200% 200%")};
  background-color: hsl(0, 0%, 90%);
  transition: background 2s ease-in-out;

  > img {
    display: none;
  }

  @media (max-width: 1000px) {
    background: none;
  }

  @media (max-width: 400px) {
    background: none;
    > img {
      display: block;
    }
  }
`;
