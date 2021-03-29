import React, {useState} from "react";
import {addNewTodo} from "./todos/todosSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch} from "../store";
import styled from "@emotion/styled";
import Notification from "../visuals/components/notification/Notification";
import BigInput from "../visuals/components/input/BigInput";

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5em;
    padding: 0;
`;

const TodoInput = () => {
    const dispatch = useAppDispatch();
    const [input, setInput] = useState("");
    const [requestStatus, setRequestStatus] = useState("idle");

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && input && requestStatus === "idle") {
            const trimmedText = input.trim();

            try {
                setRequestStatus("loading");
                const resultAction = await dispatch(addNewTodo(trimmedText));
                unwrapResult(resultAction);
                setInput("");
            } catch (e) {
                setRequestStatus("failed");
            } finally {
                setRequestStatus("idle");
            }
        }
    };

    const isLoading = requestStatus === "loading";
    const isFailed = requestStatus === "failed";

    return(
        <InputContainer>
            <BigInput
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}  //on key 'Enter'
                value={input}
                isLoading={isLoading}
            />
            {isLoading ? <Notification type={"info"} text={"Loading..."} /> : null}
            {isFailed ? <Notification type={"error"} /> : null}
        </InputContainer>
    );
};

export default TodoInput;