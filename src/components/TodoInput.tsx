import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addNewTodo} from "../features/todos/todosSlice";

const TodoInput = () => {
    const [input, setInput] = useState("");
    const [requestStatus, setRequestStatus] = useState("idle");
    const dispatch = useDispatch();

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && input && requestStatus === "idle") {
            const trimmedText = input.trim();

            try {
                setRequestStatus("loading");
                await dispatch(addNewTodo(trimmedText));
                // unwrapResult(resultAction);
                setInput("");
            } catch (e) {
                console.warn(e);
            } finally {
                setRequestStatus("idle");
            }
        }
    };

    const isLoading = requestStatus === "loading";
    
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
            {isLoading ? <div>Loading...</div> : null}
        </div>
    );
};

export default TodoInput;