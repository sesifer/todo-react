// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, {ReactElement, useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Todo, TodosState} from "../store/types";
import TodoInput from "./TodoInput";
import TodoListItem from "./TodoListItem";
import TodoListFooter from "./TodoListFooter";
import {fetchTodos} from "../features/todos/todosSlice";
import {RootState} from "../store";

const statusFiltersKeys = [
    "all",
    "active",
    "completed",
];

const selectorTodoIds = (state: RootState) => state.todos.todos.map((todo: Todo) => todo.id);
const selectorCompletedTodos = (state: RootState) => {
    return state.todos.todos.filter(todo => todo.completed);
};

const TodoList = (): ReactElement => {
    const dispatch = useDispatch();
    const todosStatus = useSelector((state: RootState) => state.todos.status);
    const error = useSelector((state: RootState) => state.todos.error);

    useEffect(() => {
        if (todosStatus === "idle") {
            dispatch(fetchTodos());
        }
    }, [todosStatus, dispatch]);

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

    // const renderFilterButtons = () => {
    //     statusFiltersKeys.map((key) => {
    //         return <li key={`filter-${key}`}>
    //             <button onClick={handleClick(key)}>{key}</button>
    //         </li>;
    //     });
    // };

    return (
        <div>
            {/*<ListHeader/>*/}
            <TodoInput />
            <ul>
                {(todosStatus === "loading") ? <div>Loading...</div> : ""}
                {(todosStatus === "succeeded") ? renderTasks() : ""}
                {(todosStatus === "failed") ? <div>{error}</div> : ""}
            </ul>
            {/*<Filter />*/}
            <ul>
                {/*{renderFilterButtons}*/}
            </ul>
            {/*<span>Clear completed</span>*/}
            <TodoListFooter/>
        </div>
    );
};

export default TodoList;