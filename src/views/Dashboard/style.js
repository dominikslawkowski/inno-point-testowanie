import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  display: grid;
  grid-template: "header main" / var(--headerWidth) auto;
  background-color: hsl(0, 0%, 95%);

  @media (max-width: 700px) {
    grid-template: "header main" / 80px auto;
  }

  @media (max-width: 470px) {
    grid-template: "header main" / 60px auto;
  }
`;
