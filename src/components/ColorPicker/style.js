import styled from "styled-components";

export const Container = styled.div`
  grid-area: ${props => props.gridArea};

  > span {
    color: #7e7e7e;
  }

  > div.circle-picker {
    margin-top: 15px;

    > span {
      transition: all 0.2s ease-in-out;
    }
  }
`;
