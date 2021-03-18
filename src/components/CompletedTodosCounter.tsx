import {useSelector} from "react-redux";
import React, {useMemo} from "react";
import {RootState} from "../store";
import {makeSelectorCompletedTodosCount} from "../features/todos/todosSlice";

interface Props {
    completed: boolean
}

const CompletedTodosCount = ({ completed }: Props) => {
    const selectCompletedTodosCount = useMemo(makeSelectorCompletedTodosCount, []);
    const count = useSelector((state: RootState) =>
        selectCompletedTodosCount(state, completed)
    );

    return <div>{count}</div>;
};

export default CompletedTodosCount;