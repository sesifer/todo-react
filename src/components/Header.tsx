import React from "react";
import styled from "@emotion/styled";
import {fontSize} from "./theme/fonts";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  transform: rotate(-0.6deg);
`;

export const StyledDiv = styled.div`
  font-size: ${fontSize.title};
  @media (max-width: 620px) {
    font-size: ${fontSize.subtitle};
  }
`;

const Header = () => {

    return <HeaderContainer>
        <StyledDiv>TODO LIST</StyledDiv>
        <StyledDiv>____________</StyledDiv>
    </HeaderContainer>;
};

export default Header;