// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import CompletedTasksCounter from "./CompletedTodosCounter";
import {RootState} from "../store/reducers";
import {Task} from "../store/types";

const TodoListFooter = ():JSX.Element => {

    return (
        <div>
            List Footer
            <span>
                <CompletedTasksCounter completed={true} />
                items to do
            </span>
            <span>
                <CompletedTasksCounter completed={false} />
                items left
            </span>
        </div>
    );
};

export default TodoListFooter;