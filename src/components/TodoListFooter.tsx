import React from "react";
import CompletedTasksCounter from "./CompletedTodosCounter";
import styled from "@emotion/styled";

const CountersContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em;
  padding: 1em;
`;

export const Span = styled.span`
  display: flex;
  padding: 0.5em;
`;

const TodoListFooter = ():JSX.Element => {

    return (
        <CountersContainer>
            <Span>
                <CompletedTasksCounter completed={true} />
                <Span>items done</Span>
            </Span>
            <Span>
                <CompletedTasksCounter completed={false} />
                <Span>items left</Span>
            </Span>
            {/*todo zmen favicon*/}
        </CountersContainer>
    );
};

export default TodoListFooter;