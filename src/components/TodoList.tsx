import React, {ReactElement, useEffect} from "react";
import {useSelector} from "react-redux";
import TodoInput from "./TodoInput";
import TodoListItem, {DeleteButton} from "./TodoListItem";
import TodoListFooter, {Span} from "./TodoListFooter";
import {deleteTodo, fetchTodos, selectFilteredTodoIds, selectorCompletedTodos} from "../features/todos/todosSlice";
import {RootState, useAppDispatch} from "../store";
import {filterChanged} from "../features/filters/filtersSlice";
import StatusFilters from "./StatusFilters";
import styled from "@emotion/styled";
import {fontFamily} from "./theme/fonts";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 1em;
  font-family: ${fontFamily.specialElite};
`;

const List = styled.ul`
  width: 40vw;
  margin: auto;
  text-align: center;
`;

const TodoList = (): ReactElement => {
    const dispatch = useAppDispatch();
    const todoIds = useSelector(selectFilteredTodoIds);
    const loadingStatus = useSelector((state: RootState) => state.todos.status);
    const error = useSelector((state: RootState) => state.todos.error);
    const appliedFilter = useSelector((state: RootState) => state.filters);
    const completedTodosIds = useSelector(selectorCompletedTodos);

    useEffect(() => {
        if (loadingStatus === "idle") {
            dispatch(fetchTodos());
        }
    }, [loadingStatus, dispatch]);

    const renderTasks = () => {
        return todoIds.map((id: string) => <TodoListItem key={`todo-${id}`} id={id} />);
    };

    const handleClearCompletedClicked = () => {
        completedTodosIds.map(id => dispatch(deleteTodo(id)));
    };

    const onFilterChange = (appliedFilter: string) =>
        dispatch(filterChanged(appliedFilter));

    return (
        <Content>
            <TodoInput />
            <List>
                {(loadingStatus === "loading") ? <li>Loading...</li> : null}
                {(loadingStatus === "succeeded") ? renderTasks() : null}
                {(loadingStatus === "failed") ? <li>{error}</li> : null}
            </List>
            <Span>.</Span>
            <StatusFilters value={appliedFilter} handleClick={onFilterChange}/>
            {(completedTodosIds.length > 0)
                ? <DeleteButton onClick={handleClearCompletedClicked}>
                    Clear Completed
                </DeleteButton>
                : null
            }
            <TodoListFooter/>
        </Content>
    );
};

export default TodoList;
