import React from "react";
import TodoList from "./components/TodoList";
import styled from "@emotion/styled";
import {fontFamily, fontSize} from "./components/theme/fonts";
import {colors} from "./components/theme/colors";

const ContentContainer = styled.div`
  font-family: ${fontFamily.specialElite};
  font-size: ${fontSize.body};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.backgroundColor};
  color: ${colors.main};
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  transform: rotate(-0.6deg);
`;

const Title = styled.div`
  font-size: ${fontSize.title};
  @media (max-width: 620px) {
    font-size: ${fontSize.subtitle};
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  font-size: ${fontSize.body};
  padding: 0 20px;
  text-align: center;
`;

function App():JSX.Element {

    return (
        <ContentContainer>
            <Header>
                <Title>TODO LIST</Title>
                <Title>____________</Title>
            </Header>
            <main>
                <TodoList/>
            </main>
            <Footer>
                <p>©Copyright 2021 by Džu. All rights reserved. This was fun!</p>
            </Footer>
        </ContentContainer>
    );
}

export default App;
