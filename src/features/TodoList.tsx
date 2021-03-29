import React, {ReactElement, useEffect} from "react";
import {useSelector} from "react-redux";
import TodoInput from "./TodoInput";
import TodoListItem from "./TodoListItem";
import TodoListFooter, {StyledSpan} from "./TodoListFooter";
import {
    fetchTodos,
    selectFilteredTodoIds,
} from "./todos/todosSlice";
import {RootState, useAppDispatch} from "../store";
import StatusFilters from "./StatusFilters";
import styled from "@emotion/styled";
import {fontFamily} from "../visuals/theme/fonts";
import Notification from "../visuals/components/notification/Notification";
import {StyledDiv} from "../visuals/components/Header";
import Actions from "./Actions";

const Content = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 1em;
  font-family: ${fontFamily.specialElite};
`;

const List = styled.ul`
  margin: auto;
  text-align: center;
`;

const TodoList = (): ReactElement => {
    const dispatch = useAppDispatch();
    const filteredTodoIds = useSelector(selectFilteredTodoIds);
    const loadingStatus = useSelector((state: RootState) => state.todos.status);
    const error = useSelector((state: RootState) => state.todos.error);

    useEffect(() => {
        if (loadingStatus === "idle") {
            dispatch(fetchTodos());
        }
    }, [loadingStatus, dispatch]);

    const renderTasks = filteredTodoIds.map((id: string) => <TodoListItem key={`todo-${id}`} id={id} />);

    const showNotification = () => {
        if (loadingStatus === "loading") {
            return <Notification type={"info"} text={"Loading..."}/>;
        }
        if (loadingStatus === "failed") {
            return <Notification type={"error"} text={error}/>;
        }
    };

    return (
        <Content>
            <TodoInput />
            <List>
                {renderTasks}
            </List>
            {showNotification()}
            <StyledSpan>.</StyledSpan>
            <StatusFilters />
            <StyledDiv>____________</StyledDiv>
            <Actions />
            <TodoListFooter/>
        </Content>
    );
};

export default TodoList;
