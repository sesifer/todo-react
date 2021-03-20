import React, {useState} from "react";
import {addNewTodo} from "../features/todos/todosSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch} from "../store";
import {fontFamily, fontSize} from "./theme/fonts";
import styled from "@emotion/styled";
import {colors} from "./theme/colors";
import Notification from "./Notification";

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5em;
    padding: 0;
`;

const Border = styled.span`
    font-family: ${fontFamily.specialElite};
    font-size: ${fontSize.title};
  @media (max-width: 620px) {
    font-size: ${fontSize.subtitle};
  }
`;

const Input = styled.input`
  margin: 0 0 10px 0;
  width: 95%;
  border: none;
  background: none;
  font-family: ${fontFamily.specialElite};
  font-size: ${fontSize.subtitle};
  @media (max-width: 620px) {
    font-size: ${fontSize.body};
  }
  text-align: center;
  padding: 0.3em 0 0 0;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover{
    background-color: ${colors.thistleSoft};
  }
  &:focus {
    outline: none;
  }
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
            <Border>[</Border>
            <Input
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}  //on key 'Enter'
                value={input}
                type="text"
                name="todo"
                placeholder={isLoading ? "" : "What needs to be done?"}
                disabled={isLoading}
                color={"pink"}
            />
            <Border>]</Border>
            {isLoading ? <Notification type={"info"} text={"Loading..."} /> : null}
            {isFailed ? <Notification type={"error"} /> : null}
        </InputContainer>
    );
};

export default TodoInput;