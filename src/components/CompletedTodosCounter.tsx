import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import React, {useMemo} from "react";
import {Todo} from "../features/todos/types";
import {RootState} from "../store";

const makeSelectorCompletedTodosCount = () =>
    createSelector(
        (state:RootState) => state.todos.todos,
        (_: any, completed: boolean) => completed,
        (todos: Todo[], completed: boolean) =>
            todos.filter(todo => todo.completed === completed).length
    );

interface Props {
    completed: boolean
}

const CompletedTodosCount = ({ completed }: Props) => {
    const selectCompletedTodosCount = useMemo(makeSelectorCompletedTodosCount, []);

    const matchingCount = useSelector((state :RootState) =>
        selectCompletedTodosCount(state, completed)
    );

    return <div>{matchingCount}</div>;
};

export default CompletedTodosCount;