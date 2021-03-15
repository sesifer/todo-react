// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import {
    ADD_TASK,
    COMPLETE_TASK,
    DELETE_TASK,
    GET_TASKS,
    GET_TASKS_FAILURE,
    GET_TASKS_SUCCESS,
    Task,
    TasksActionTypes,
    TasksState,
    UPDATE_TASK
} from "../types";
import {BASE_URL} from "../../api/useRequest";
import {addTask, completeTask, deleteTask, getTasks, getTasksFailure, getTasksSuccess, updateTask} from "../actions";

const initialState = {
    tasks: [],
    loading: false,
    hasErrors: false,
};

export const tasksReducer = (state: TasksState = initialState, action: TasksActionTypes): TasksState => {
    let tasks = [];

    switch (action.type) {
        case GET_TASKS:
            return { ...state, loading: true };

        case GET_TASKS_SUCCESS:
            return { tasks: [...action.payload], loading: false, hasErrors: false};

        case GET_TASKS_FAILURE:
            return { ...state, loading: false, hasErrors: true};

        case ADD_TASK:
            tasks = [...state.tasks, action.payload];

            return {
                ...state,
                tasks: tasks,
            };

        case UPDATE_TASK:
            tasks = state.tasks.map((task:Task) => {
                if (task.id !== action.payload.id) {
                    
                    return task;
                }
                
                return {
                    ...task,
                    text: action.payload.text
                };
            });

            return {
                ...state,
                tasks: tasks
            };

        case COMPLETE_TASK:
            tasks = state.tasks.map((task:Task) => {
                if (task.id !== action.payload) {

                    return task;
                }

                return {
                    ...task,
                    completed: !task.completed
                };
            });

            return {
                ...state,
                tasks: tasks
            };

        case DELETE_TASK:
            tasks = state.tasks.filter(task => task.id !== action.payload);

            return {
                ...state,
                tasks: tasks
            };

            // case GET_COMPLETED_TASKS:
            //     tasks = state.tasks.filter(task => task.completed);
            //     return { ...state, loading: true };
            //
            // case GET_COMPLETED_TASKS_SUCCESS:
            //     return { tasks: [...action.payload], loading: false, hasErrors: false};
            //
            // case GET_COMPLETED_TASKS_FAILURE:
            //     return { ...state, loading: false, hasErrors: true};


        default:
            return state;
    }
};

// asynchronous thunk to fetch tasks
export const fetchTasks = () => async (dispatch, getState) => {
    dispatch(getTasks());

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        dispatch(getTasksSuccess(data));
    } catch (error) {
        dispatch(getTasksFailure());
    }
};

// asynchronous thunk to save a task
export const saveTask = (text: string) => async (dispatch, getState) => {
    const requestData = { text: text };
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(requestData)
    });
    const data = await response.json();

    dispatch(addTask(data));
};

// asynchronous thunk to delete a task
export const removeTask = (taskId: string) => async (dispatch, getState) => {
    await fetch(`${BASE_URL}/${taskId}`, {
        method: "DELETE",
    });
    dispatch(deleteTask(taskId));
};

// asynchronous thunk to complete a task
export const completeTaskThunk = (taskId: string) => async (dispatch) => {
    await fetch(`${BASE_URL}/${taskId}/complete`, {
        method: "POST",
    });
    dispatch(completeTask(taskId));
};

// asynchronous thunk to mark a task as incomplete
export const incompleteTaskThunk = (taskId: string) => async (dispatch, getState) => {
    await fetch(`${BASE_URL}/${taskId}/incomplete`, {
        method: "POST",
    });
    dispatch(completeTask(taskId));
};

// asynchronous thunk to update a task
export const updateTaskThunk = (taskId: string, text: string) => async (dispatch, getState) => {
    const data = { text: text };
    await fetch(`${BASE_URL}/${taskId}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    dispatch(updateTask(taskId, text));
};

// asynchronous thunk to get all completed tasks
export const getAllCompletedTasksThunk = () => async (dispatch, getState) => {
    await fetch(`${BASE_URL}/completed`, {
        method: "GET",
    });

    dispatch(completeTask(taskId));
};

