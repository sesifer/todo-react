import React from "react";
import TodoList from "./components/TodoList";
import styled from "@emotion/styled";
import {fontFamily, fontSize} from "./components/theme/fonts";

const ContentContainer = styled.div`
  font-family: ${fontFamily.specialElite};
  font-size: ${fontSize.body};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
`;

const Title = styled.div`
  font-size: ${fontSize.title};
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
`;

function App():JSX.Element {

    return (
        <ContentContainer>
            <Header>
                <Title>TODO LIST</Title>
                <Title>__________</Title>
            </Header>
            <main>
                <TodoList/>
            </main>
            <Footer>
                <p>©Copyright 2050 by Džu. All rights reversed. This was fun!</p>
            </Footer>
        </ContentContainer>
    );
}

export default App;
