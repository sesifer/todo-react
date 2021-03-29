import React, {useEffect, useState} from "react";
import {completeTodo, deleteTodo, selectTodoById, updateTodo} from "./todos/todosSlice";
import {RootState, useAppDispatch} from "../store";
import {useSelector} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import Notification from "../visuals/components/notification/Notification";
import styled from "@emotion/styled";
import {fontSize} from "../visuals/theme/fonts";
import ListItem from "../visuals/components/ListItem";

const TodoContainer = styled.div`
  position: relative;
  font-size: ${fontSize.body};
  display: flex;
  font-size: ${fontSize.subtitle};
  @media (max-width: 620px) {
    font-size: ${fontSize.body};
  }
  align-items: baseline;
`;

interface TodoListItemProps {
    id: string;
}

const TodoListItem = ({ id } :TodoListItemProps):JSX.Element => {
    const dispatch = useAppDispatch();
    const todo = useSelector((state: RootState) => selectTodoById(state, id));

    const [inputToggle, setInputToggle] = useState(false);
    const [isTodoCompleted, toggleCompleted] = useState(!!(todo?.completed));
    const [input, setInput] = useState(todo?.text);
    const [requestStatus, setRequestStatus] = useState("idle");

    useEffect(() => {
        toggleCompleted(!!(todo?.completed));

    }, [todo, dispatch]);

    const handleDoubleClick = () => {
        setInputToggle(!inputToggle);
        document.getElementById("edit")?.focus();
    };

    const handleCompleted = () => {
        dispatch(completeTodo({id, isTodoCompleted}));
        toggleCompleted(!isTodoCompleted);
        
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
        <li>
            <TodoContainer>
                <ListItem
                    id={id}
                    handleCompleted={handleCompleted}
                    checked={isTodoCompleted}
                    inputToggle={inputToggle}
                    handleDoubleClick={handleDoubleClick}
                    input={input || ""}
                    handleKeyDown={handleKeyDown}
                    handleInputChange={(event) => setInput(event.target.value)}
                    handleDelete={handleDelete}
                />
                {isLoading ? <Notification type={"info"} text={"Loading..."} /> : null}
                {isFailed ? <Notification type={"error"} /> : null}
            </TodoContainer>
        </li>
    );
};

export default TodoListItem;