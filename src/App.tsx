import React from "react";
import TodoList from "./features/TodoList";
import styled from "@emotion/styled";
import {fontFamily, fontSize} from "./visuals/theme/fonts";
import {colors} from "./visuals/theme/colors";
import Footer from "./visuals/components/Footer";
import Header from "./visuals/components/Header";

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
