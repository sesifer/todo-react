import React from "react";
import CompletedTasksCounter from "./CompletedTodosCounter";

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