import React, {useMemo} from "react";
import {RootState} from "../store";
import {makeSelectorCompletedTodosCount} from "./todos/todosSlice";
import styled from "@emotion/styled";
import {colors} from "../visuals/theme/colors";
import {useSelector} from "react-redux";

const StyledDiv = styled.div`
  padding: 0.5em;
  color: ${colors.steelTeal};
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover{
    background-color: ${colors.thistleSoft};
  }
`;

interface CompletedTodosCountProps {
    completed: boolean
}

const CompletedTodosCount = ({ completed }: CompletedTodosCountProps) => {
    const selectCompletedTodosCount = useMemo(makeSelectorCompletedTodosCount, []);
    const count = useSelector((state: RootState) =>
        selectCompletedTodosCount(state, completed)
    );

    return <StyledDiv>{count}</StyledDiv>;
};

export default CompletedTodosCount;