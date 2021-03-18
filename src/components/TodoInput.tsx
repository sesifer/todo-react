import React, {useState} from "react";
import {addNewTodo} from "../features/todos/todosSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch} from "../store";

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
        <div>
            <input
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}  //on key 'Enter'
                value={input}
                type="text"
                name="todo"
                placeholder={isLoading ? "" : "What needs to be done?"}
                disabled={isLoading}
            />
            {/*todo pouzi nieco ako NICO notifikaciu na 2 sekundy*/}
            {isLoading ? <div>Loading...</div> : null}
            {isFailed ? <div>Ooops...</div> : null}
        </div>
    );
};

export default TodoInput;