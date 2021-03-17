// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, {ReactElement, useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Todo} from "../features/todos/types";
import TodoInput from "./TodoInput";
import TodoListItem from "./TodoListItem";
import TodoListFooter from "./TodoListFooter";
import {deleteTodo, fetchTodos, selectorCompletedTodos, selectorTodoIds} from "../features/todos/todosSlice";
import {RootState} from "../store";

const TodoList = (): ReactElement => {
    const dispatch = useDispatch();
    const loadingStatus = useSelector((state: RootState) => state.todos.status);
    const error = useSelector((state: RootState) => state.todos.error);
    const completedTodosIds = useSelector(selectorCompletedTodos);

    useEffect(() => {
        if (loadingStatus === "idle") {
            dispatch(fetchTodos());
        }
    }, [loadingStatus, dispatch]);

    //taskId by mali byt dynamicky generovane podla filtra
    //takze selector musi byt dynamicke generovany podla toho, ktory filter je v STATE
    const todoIds = useSelector(selectorTodoIds, shallowEqual);
    const renderTasks = () => {
        return todoIds.map((id: string) => <TodoListItem key={`todo-${id}`} id={id} />);
    };

    const handleClick = (key: string) => {
        // switch(key) {
        //     case "all":
        //         return {
        //             const completedTodos = useSelector(selectorCompletedTodos);
        //         };
        //     case "active": {}
        //     case "completed": {}
        //     default: return {};
        // }
    };

    const handleAllClicked = () => {
        console.log("handleAllClicked");
    };

    const handleActiveClicked = () => {
        console.log("handleActiveClicked");
    };

    const handleCompletedClicked = () => {
        console.log("handleCompletedClicked");
    };

    const handleClearCompletedClicked = () => {
        completedTodosIds.map(id => dispatch(deleteTodo(id)));
    };

    return (
        <div>
            {/*<ListHeader/>*/}
            <TodoInput />
            <ul>
                {(loadingStatus === "loading") ? <div>Loading...</div> : ""}
                {(loadingStatus === "succeeded") ? renderTasks() : ""}
                {(loadingStatus === "failed") ? <div>{error}</div> : ""}
            </ul>

            {/*<Filter />*/}
            <button onClick={handleAllClicked}>All</button>
            <button onClick={handleActiveClicked}>Active</button>
            <button onClick={handleCompletedClicked}>Completed</button>

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
