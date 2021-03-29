import Button from "../visuals/components/buttons/Button";
import DeleteButton from "../visuals/components/buttons/DeleteButton";
import React from "react";
import styled from "@emotion/styled";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../store";
import {
    completedTodosSelector,
    completeTodo,
    deleteTodo,
    incompleteTodosSelector,
    selectFilteredTodoIds
} from "./todos/todosSlice";

const ActionButtonsContainer = styled.div`
  margin: 1em;
`;

const Actions = () => {
    const dispatch = useAppDispatch();

    const appliedFilter = useSelector((state: RootState) => state.filters);
    const filteredTodoIds = useSelector(selectFilteredTodoIds);
    const incompleteTodos = useSelector(incompleteTodosSelector);
    const completedTodosIds = useSelector(completedTodosSelector);

    const handleToggleCompleteAll = () => {

        if (incompleteTodos.length > 0) {
            const isTodoCompleted = false;

            incompleteTodos.map(id => dispatch(completeTodo({id, isTodoCompleted})));
        } else {
            const isTodoCompleted = true;
            completedTodosIds.map(id => dispatch(completeTodo({id, isTodoCompleted})));
        }
    };

    const handleClearCompletedClicked = () => {
        completedTodosIds.map(id => dispatch(deleteTodo(id)));
    };

    return (
        <ActionButtonsContainer>
            {(appliedFilter === "all" && filteredTodoIds.length > 0)
                ? <Button
                    id={"completeAll"}
                    handleClick={handleToggleCompleteAll}
                >
                    {incompleteTodos.length > 0 ? "Complete All" : "Uncheck All"}
                </Button>
                : null
            }
            {(completedTodosIds.length > 0 && (appliedFilter === "all" || appliedFilter === "completed"))
                ? <DeleteButton handleClick={handleClearCompletedClicked}>
                    Clear Completed
                </DeleteButton>
                : null
            }
        </ActionButtonsContainer>
    );
};

export default Actions;