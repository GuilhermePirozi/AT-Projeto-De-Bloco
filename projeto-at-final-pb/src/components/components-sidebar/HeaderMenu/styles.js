import styled from "styled-components";

export const Container = styled.div`
  > svg {
    color: white;
    width: 30px;
    height: 30px;
    cursor: pointer;

    @media (min-width: 768px) {
      width: 40px;
      height: 40px;
    }

    @media (min-width: 1280px) {
      width: 36px;
      height: 36px;
      margin-top: 10px;
    }
  }
`;
