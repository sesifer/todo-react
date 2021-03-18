import React, {useState} from "react";
import {completeTodo, deleteTodo, selectTodoById, updateTodo} from "../features/todos/todosSlice";
import {RootState, useAppDispatch} from "../store";
import {useSelector} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import Notification from "./Notification";

interface TodoListItemProps {
    id: string;
}

const TodoListItem = ({ id } :TodoListItemProps):JSX.Element => {
    const dispatch = useAppDispatch();
    const todo = useSelector((state: RootState) => selectTodoById(state, id));
    const [inputToggle, setInputToggle] = useState(false);
    const [isTodoCompleted, toggleCompleted] = useState(!!todo?.completed);
    const [input, setInput] = useState(todo?.text);
    const [requestStatus, setRequestStatus] = useState("idle");

    const handleCompleted = () => {
        toggleCompleted(!isTodoCompleted);
        dispatch(completeTodo({id, isTodoCompleted}));
    };

    const handleDelete = async () => {
        try {
            setRequestStatus("loading");
            const resultAction = await dispatch(deleteTodo(id));
            unwrapResult(resultAction);
        } catch (e) {
            setRequestStatus("failed");
        } finally {
            setRequestStatus("idle");
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && input === "") {
            handleDelete();
            setInputToggle(!inputToggle);
        }
        if (event.key === "Enter" && input) {
            const text = input.trim();
            dispatch(updateTodo({id, text}));
            setInputToggle(!inputToggle);
        }
        if (event.key === "Escape") {
            setInput(todo?.text);
            setInputToggle(!inputToggle);
        }
    };

    const isLoading = requestStatus === "loading";
    const isFailed = requestStatus === "failed";

    return (
        <div>
            <input
                type={"checkbox"}
                onChange={handleCompleted}
                checked={isTodoCompleted}
                disabled={inputToggle}
            />
            {inputToggle
                ? <input
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}  //on key 'Enter'
                    value={input}
                    type="text"
                    name="todoEdit"
                    placeholder="What needs to be done?"
                />
                : <React.Fragment>
                    <span onDoubleClick={() => setInputToggle(!inputToggle)}>{input}</span>
                    <button onClick={handleDelete}>X</button>
                </React.Fragment>
            }
            {/*todo pouzi nieco ako NICO notifikaciu na 2 sekundy*/}
            {isLoading ? <Notification /> : null}
            {isFailed ? <div>Ooops...</div> : null}
        </div>
    );
};

export default TodoListItem;