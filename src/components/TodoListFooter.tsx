import React from "react";
import CompletedTasksCounter from "./CompletedTodosCount";
import styled from "@emotion/styled";

const CountersContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em;
  padding: 1em;
`;

export const StyledSpan = styled.span`
  display: flex;
  padding: 0.5em;
`;

const TodoListFooter = ():JSX.Element => {

    return (
        <React.Fragment>
            <CountersContainer>
                <StyledSpan>
                    <CompletedTasksCounter completed={true} />
                    <StyledSpan>items done</StyledSpan>
                </StyledSpan>
                <StyledSpan>
                    <CompletedTasksCounter completed={false} />
                    <StyledSpan>items left</StyledSpan>
                </StyledSpan>
            </CountersContainer>
            <p>Double-click to edit a todo</p>
        </React.Fragment>
    );
};

export default TodoListFooter;