import React, {ReactElement, useEffect} from "react";
import {useSelector} from "react-redux";
import TodoInput from "./TodoInput";
import TodoListItem from "./TodoListItem";
import TodoListFooter from "./TodoListFooter";
import {deleteTodo, fetchTodos, selectFilteredTodoIds, selectorCompletedTodos} from "../features/todos/todosSlice";
import {RootState, useAppDispatch} from "../store";
import {filterChanged} from "../features/filters/filtersSlice";
import StatusFilters from "./StatusFilters";

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
        <div>
            <TodoInput />
            <ul>
                {(loadingStatus === "loading") ? <div>Loading...</div> : null}
                {(loadingStatus === "succeeded") ? renderTasks() : null}
                {(loadingStatus === "failed") ? <div>{error}</div> : null}
            </ul>
            <StatusFilters value={appliedFilter} handleClick={onFilterChange}/>
            {(completedTodosIds.length > 0)
                ? <button onClick={handleClearCompletedClicked}>
                    Clear Completed
                </button>
                : null
            }
            <TodoListFooter/>
        </div>
    );
};

export default TodoList;
