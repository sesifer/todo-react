import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import React, {useMemo} from "react";
import {Task} from "../store/types";
import {RootState} from "../store/reducers";

const makeSelectorCompletedTodosCount = () =>
    createSelector(
        (state :RootState) => state.tasks.tasks,
        (_: any, completed: boolean) => completed,
        (tasks: Task[], completed: boolean) =>
            tasks.filter(task => task.completed === completed).length
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