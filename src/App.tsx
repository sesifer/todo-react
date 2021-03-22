import React from "react";
import TodoList from "./components/TodoList";
import styled from "@emotion/styled";
import {fontFamily, fontSize} from "./components/theme/fonts";
import {colors} from "./components/theme/colors";
import Footer from "./components/Footer";
import Header from "./components/Header";

const ContentContainer = styled.div`
  font-family: ${fontFamily.specialElite};
  font-size: ${fontSize.body};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.backgroundColor};
  color: ${colors.main};
  max-width: 520px;
  margin: auto;
`;

function App():JSX.Element {

    return (
        <ContentContainer>
            <Header />
            <main>
                <TodoList/>
            </main>
            <Footer />
        </ContentContainer>
    );
}

export default App;
