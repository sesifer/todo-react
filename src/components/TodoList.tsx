// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, {ReactElement, useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Task} from "../store/types";
import TodoInput from "./TodoInput";
import {RootState} from "../store/reducers";
import TodoListItem from "./TodoListItem";
import {fetchTasks} from "../store/reducers/tasks";
import TodoListFooter from "./TodoListFooter";

const statusFiltersKeys = [
    "all",
    "active",
    "completed",
];

const selectorTaskIds = (state: RootState) => state.tasks.tasks.map((task: Task) => task.id);
const selectorCompletedTodos = (state: RootState) => {
    return state.tasks.tasks.filter(task => task.completed);
};

const TodoList = (): ReactElement => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    //taskId by mali byt dynamicky generovane podla filtra
    //takze selector musi byt dynamicke generovany podla toho, ktory filter je v STATE
    const taskIds = useSelector(selectorTaskIds, shallowEqual);

    const renderTasks = () => {
        return taskIds.map((taskId: string) => <TodoListItem key={`todo-${taskId}`} id={taskId} />);
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

    const renderFilterButtons = () => {
        statusFiltersKeys.map((key) => {
            return <li key={`filter-${key}`}>
                <button onClick={handleClick(key)}>{key}</button>
            </li>;
        });
    };

    return (
        <div>
            {/*<ListHeader/>*/}
            <TodoInput />
            <ul>
                {renderTasks()}
            </ul>
            {/*<Filter />*/}
            <ul>
                {renderFilterButtons}
            </ul>
            {/*<span>Clear completed</span>*/}
            <TodoListFooter/>
        </div>
    );
};

export default TodoList;