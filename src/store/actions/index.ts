import {
    ADD_TASK,
    COMPLETE_TASK,
    DELETE_TASK,
    GET_TASKS,
    GET_TASKS_FAILURE,
    GET_TASKS_SUCCESS,
    SET_TASKS, Task, UPDATE_TASK
} from "../types";

export const getTasks = () => ({
    type: GET_TASKS,
});

export const getTasksSuccess = (data: any) => ({
    type: GET_TASKS_SUCCESS,
    payload: data,
});

export const getTasksFailure = () => ({
    type: GET_TASKS_FAILURE,
});

export const setTasks = (tasks: []) => {
    return {
        type: SET_TASKS,
        payload: tasks,
    };
};

export const addTask = (task: Task) => {
    return {
        type: ADD_TASK,
        payload: task
    };
};

export const completeTask = (taskId: string) => {
    return {
        type: COMPLETE_TASK,
        payload: taskId
    };
};

export const deleteTask = (taskId: string) => {
    return {
        type: DELETE_TASK,
        payload: taskId
    };
};

export const updateTask = (taskId: string, text: string) => {
    return {
        type: UPDATE_TASK,
        payload: {
            taskId,
            text
        }
    };
};