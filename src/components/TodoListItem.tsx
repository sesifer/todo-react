// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducers";
import {completeTodo, deleteTodo, updateTodo} from "../features/todos/todosSlice";

const selectorTodoById = (state, todoId) => {
    return state.todos.todos.find(todo => todo.id === todoId);
};

interface TodoListItemProps {
    id: string;
}

const TodoListItem = ({ id } :TodoListItemProps):JSX.Element => {
    const [inputToggle, setInputToggle] = useState(false);
    const todo = useSelector((state: RootState) => selectorTodoById(state, id));
    const { text, completed } = todo;
    const [isTodoCompleted, toggleCompleted] = useState(completed);
    const dispatch = useDispatch();

    const handleCompleted = () => {
        toggleCompleted(!isTodoCompleted);
        dispatch(completeTodo({id, isTodoCompleted}));
    };

    const handleDelete = () => {
        dispatch(deleteTodo(id));
    };

    const [input, setInput] = useState(text);
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
            setInput(text);
            setInputToggle(!inputToggle);
        }
    };

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
                :<React.Fragment>
                    <span onDoubleClick={() => setInputToggle(!inputToggle)}>{input}</span>
                    <button onClick={handleDelete}>X</button>
                </React.Fragment>
            }
        </div>
    );
};

export default TodoListItem;