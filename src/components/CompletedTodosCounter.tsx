import {useSelector} from "react-redux";
import React, {useMemo} from "react";
import {RootState} from "../store";
import {makeSelectorCompletedTodosCount} from "../features/todos/todosSlice";
import styled from "@emotion/styled";
import {colors} from "./theme/colors";

const Number = styled.div`
  padding: 0.5em;
  color: ${colors.steelTeal};
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover{
    background-color: ${colors.thistleSoft};
  }
`;

interface Props {
    completed: boolean
}

const CompletedTodosCount = ({ completed }: Props) => {
    const selectCompletedTodosCount = useMemo(makeSelectorCompletedTodosCount, []);
    const count = useSelector((state: RootState) =>
        selectCompletedTodosCount(state, completed)
    );

    return <Number>{count}</Number>;
};

export default CompletedTodosCount;