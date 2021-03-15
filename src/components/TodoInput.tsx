
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {fetchTasks, saveTask, updateTaskThunk} from "../store/reducers/tasks";

interface TodoInputProps {
    id?: string;
    text?: string;
}

const TodoInput = ({ id, text }  :TodoInputProps) => {
    const [input, setInput] = useState(text);
    const dispatch = useDispatch();

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && input) {
            const trimmedText = input.trim();
            await dispatch(saveTask(trimmedText));
            setInput("");
        }
    };

    return(
        <div>
            <input
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}  //on key 'Enter'
                value={input}
                type="text"
                name="todo"
                placeholder="What needs to be done?"
            />
        </div>
    );
};

export default TodoInput;