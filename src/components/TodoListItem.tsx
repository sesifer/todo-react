import React, {useState} from "react";
import {completeTodo, deleteTodo, selectTodoById, updateTodo} from "../features/todos/todosSlice";
import {RootState, useAppDispatch} from "../store";
import {useSelector} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import Notification from "./Notification";
import styled from "@emotion/styled";
import {fontFamily, fontSize} from "./theme/fonts";
import {boxShadow, colors} from "./theme/colors";

const TodoContainer = styled.div`
  font-size: ${fontSize.body};
  display: flex;
  font-size: ${fontSize.subtitle};
  @media (max-width: 620px) {
    font-size: ${fontSize.body};
  }
  align-items: baseline;
`;

interface LabelProps {
    checked: boolean;
}

const Container = styled.label<LabelProps>`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-decoration: ${props => props.checked ? "line-through" : "none"};
  overflow-wrap: anywhere;
  /* On mouse-over, add a thistle background color */
  &:hover input ~ span {
    background-color: ${colors.thistle};
    box-shadow: ${boxShadow.dreamy};
  }
`;

const Checkbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  /* When the checkbox is checked, add a thistle background */
  &:checked ~ span {
    background-color: ${colors.steelTeal};X
  }
  /* Show the checkmark when checked */
  &:checked ~ span::after {
    display: block;
  }
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: ${colors.thistleSoft};
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  
  /* Create the checkmark/indicator (hidden when not checked) */
  &:after {
    content: "";
    position: absolute;
    display: none;
  }
  /* Style the checkmark/indicator */
  &::after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const EditInput = styled.input`
  font-family: ${fontFamily.specialElite};
  font-size: ${fontSize.body};
  border: solid 0.1px ${colors.main};
  background-color: ${colors.thistleSoft};
  line-height: 21px;
`;

export const DeleteButton = styled.button`
  font-family: ${fontFamily.specialElite};
  font-size: ${fontSize.body};
  border: none;
  background: none;
  color: ${colors.goldenGateBridge};
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:before {
    content: ">";
    margin: 0.2em;
  }
  &:after {
    content: "<";
    margin: 0.2em;
  }
  &:hover{
    box-shadow: ${boxShadow.dreamy};
    background-color: ${colors.thistleSoft};
  }
  &:focus {
    outline: none;
  }
`;

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

    const handleDoubleClick = () => {
        setInputToggle(!inputToggle);
        document.getElementById("edit")?.focus();
    };

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
        <li>
            <TodoContainer>
                {/*todo fix doubleclick vs compelted*/}
                <Container  onDoubleClick={handleDoubleClick} checked={isTodoCompleted}>
                    {inputToggle
                        ? <EditInput
                            id={"edit"}
                            onChange={(event) => setInput(event.target.value)}
                            onKeyDown={handleKeyDown}  //on key 'Enter'
                            value={input}
                            type="text"
                            name="todoEdit"
                            placeholder="What needs to be done?"
                        />
                        : input
                    }
                    <Checkbox
                        id={`checkbox-${id}`}
                        name={"itemCheckbox"}
                        type={"checkbox"}
                        value={">"}
                        onChange={handleCompleted}
                        checked={isTodoCompleted}
                        disabled={inputToggle}
                    />
                    <Checkmark></Checkmark>
                </Container>
                {inputToggle
                    ? null
                    : <DeleteButton onClick={handleDelete}>x</DeleteButton>
                }
                {isLoading ? <Notification type={"info"} text={"Loading..."} /> : null}
                {isFailed ? <Notification type={"error"} /> : null}
            </TodoContainer>
        </li>
    );
};

export default TodoListItem;