import React from "react";
import CompletedTasksCounter from "./CompletedTodosCounter";
import styled from "@emotion/styled";

const CountersContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em;
  padding: 1em;
`;

const Counter = styled.span`
  display: flex;
  padding: 0.5em;
  & first-child {
  padding-right: 0.5em;
}
`;

const TodoListFooter = ():JSX.Element => {

    return (
        <CountersContainer>
            <Counter>
                <CompletedTasksCounter completed={true} />
                <span>items done</span>
            </Counter>
            <Counter>
                <CompletedTasksCounter completed={false} />
                <span>items left</span>
            </Counter>
            //todo zmen favicon
        </CountersContainer>
    );
};

export default TodoListFooter;