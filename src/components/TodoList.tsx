import React, {ReactElement, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import TodoInput from "./TodoInput";
import TodoListItem from "./TodoListItem";
import TodoListFooter, {StyledSpan} from "./TodoListFooter";
import {
    completedTodosSelector,
    completeTodo,
    deleteTodo,
    fetchTodos,
    incompleteTodosSelector,
    selectFilteredTodoIds,
} from "../features/todos/todosSlice";
import {RootState, useAppDispatch} from "../store";
import StatusFilters from "./StatusFilters";
import styled from "@emotion/styled";
import {fontFamily} from "./theme/fonts";
import Notification from "./Notification";
import DeleteButton from "./buttons/DeleteButton";
import Button from "./buttons/Button";
import {StyledDiv} from "./Header";

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

const ActionButtonsContainer = styled.div`
  margin: 1em;
`;

const TodoList = (): ReactElement => {
    const _isMounted = useRef(true);
    const dispatch = useAppDispatch();

    const filteredTodoIds = useSelector(selectFilteredTodoIds);
    const completedTodosIds = useSelector(completedTodosSelector);
    const incompleteTodos = useSelector(incompleteTodosSelector);

    const loadingStatus = useSelector((state: RootState) => state.todos.status);
    const error = useSelector((state: RootState) => state.todos.error);
    const appliedFilter = useSelector((state: RootState) => state.filters);

    useEffect(() => {
        if (loadingStatus === "idle") {
            dispatch(fetchTodos());
        }

        return () => {
            _isMounted.current = false;
        };
    }, [loadingStatus, dispatch]);

    const renderTasks = filteredTodoIds.map((id: string) => <TodoListItem key={`todo-${id}`} id={id} />);

    const handleClearCompletedClicked = () => {
        completedTodosIds.map(id => dispatch(deleteTodo(id)));
    };

    const handleToggleCompleteAll = () => {

        if (incompleteTodos.length > 0) {
            const isTodoCompleted = false;

            incompleteTodos.map(id => dispatch(completeTodo({id, isTodoCompleted})));
        } else {
            const isTodoCompleted = true;
            completedTodosIds.map(id => dispatch(completeTodo({id, isTodoCompleted})));
        }
    };

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
            <ActionButtonsContainer>
                {(appliedFilter === "all" && filteredTodoIds.length > 0)
                    ? <Button
                        id={"completeAll"}
                        handleClick={handleToggleCompleteAll}
                    >
                        {incompleteTodos.length > 0 ? "Complete All" : "Uncheck All"}
                    </Button>
                    : null
                }
                {(completedTodosIds.length > 0 && (appliedFilter === "all" || appliedFilter === "completed"))
                    ? <DeleteButton handleClick={handleClearCompletedClicked}>Clear Completed</DeleteButton>
                    : null
                }
            </ActionButtonsContainer>
            <TodoListFooter/>
        </Content>
    );
};

export default TodoList;
