export const GET_TASKS = "GET_TASKS";
export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS";
export const GET_TASKS_FAILURE = "GET_TASKS_FAILURE";
export const SET_TASKS = "SET_TASKS";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const RENAME_TASK = "RENAME_TASK";
export const COMPLETE_TASK = "COMPLETE_TASK";
export const REMOVE_COMPLETED_TASKS = "REMOVE_ALL_TASKS";
export const UPDATE_TASK = "UPDATE_TASK";

export interface Task {
    id: string
    text: string
    completed: boolean
    createdDate: number
    completedDate: number
}

export interface TasksState {
    tasks: Task[],
    loading: boolean,
    hasErrors: boolean,
}

export interface Todo {
    id: string
    text: string
    completed: boolean
    createdDate: number
    completedDate: number
}

export interface TodosState {
    todos: Todo[],
    status: "idle" | "loading" | "succeeded" | "failed",
    error: string | null,
}

interface GetTasksAction {
    type: typeof GET_TASKS
}

interface GetTasksSuccessAction {
    type: typeof GET_TASKS_SUCCESS
    payload: Task[]
}

interface GetTasksFailureAction {
    type: typeof GET_TASKS_FAILURE
}

interface SetTasksAction {
    type: typeof SET_TASKS
    payload: Task[]
}

interface AddTaskAction {
    type: typeof ADD_TASK
    payload: Task[]
}

interface DeleteTaskAction {
    type: typeof DELETE_TASK
    payload: string
}

interface RenameTaskAction {
    type: typeof RENAME_TASK
}
interface CompleteTaskAction {
    type: typeof COMPLETE_TASK
}

interface RemoveCompletedTasksAction {
    type: typeof REMOVE_COMPLETED_TASKS
}

interface UpdateTaskAction {
    type: typeof UPDATE_TASK
}

export type TasksActionTypes =
    GetTasksAction |
    GetTasksSuccessAction |
    GetTasksFailureAction |
    SetTasksAction |
    AddTaskAction |
    DeleteTaskAction |
    RenameTaskAction |
    CompleteTaskAction |
    UpdateTaskAction |
    RemoveCompletedTasksAction;

/*********************HAPPINESS*********************/

export const SET_HAPPINESS = "SET_HAPPINESS";

export interface SetHappinessAction {
    type: typeof SET_HAPPINESS
}

export type HappinessActionTypes = SetHappinessAction;