import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {Todo, TodosState} from "./types";
import {RootState} from "../../store";
import {createSelector} from "reselect";
import {Filters} from "../filters/filtersSlice";
import {BASE_URL, client} from "../../api/client";

// asynchronous thunk to fetch tasks
export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async () => {
        const response = await client.get(BASE_URL);

        return response;
    }
);

// asynchronous thunk to save a task
export const addNewTodo = createAsyncThunk(
    "todos/addNewTodo",
    async (text: string) => {
        const requestData = { text: text };
        const response = await client.post(BASE_URL, requestData);

        return response;
    }
);

// asynchronous thunk to delete a task
export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id: string) => {
        await client.delete(`${BASE_URL}/${id}ddd`);

        return id;
    }
);

// asynchronous thunk to complete a task
export const completeTodo = createAsyncThunk(
    "todos/completeTodo",
    async ({ id, isTodoCompleted }: { id: string, isTodoCompleted: boolean }) => {
        const completionAction = isTodoCompleted ? "incomplete" : "complete";
        const response = await client.post(`${BASE_URL}/${id}/${completionAction}`);

        return response;
    }
);

// asynchronous thunk to update a task
export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async ({ id, text }: { id: string, text: string }) => {
        const requestData = { text: text };
        const response = await client.post(`${BASE_URL}/${id}`, requestData);

        return response;
    }
);

const initialState: TodosState = {
    todos: [],
    status: "idle",
    error: undefined,
};

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTodos.fulfilled, (state: TodosState, {payload}) => {
                state.status = "succeeded";
                state.todos = [...payload];
            })
            .addCase(fetchTodos.rejected, (state: TodosState, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewTodo.fulfilled, (state, {payload}) => {
                state.todos = [...state.todos, payload];
            })
            .addCase(deleteTodo.fulfilled, (state, {payload}) => {
                const todos = state.todos.filter(todo => todo.id !== payload);

                return {
                    ...state,
                    todos: todos
                };
            })
            .addCase(completeTodo.fulfilled, (state, {payload}) => {
                const todo = state.todos.find((todo) => todo.id === payload.id);
                if (todo) {
                    todo.completed = payload.completed;
                }
            });
    }
});

export const action = todosSlice.actions;

export default todosSlice.reducer;

/************************SELECTORS************************/
export const selectorFilteredTodos = createSelector(
    (state: RootState) => state.todos.todos,
    (state:RootState) => state.filters,
    (todos, status) => {
        if (status === Filters.All) {
            return todos;
        }
        if (status === Filters.Completed) {
            return todos.filter(todo => todo.completed);
        }

        //return active todos
        return todos.filter(todo => !todo.completed);
    }
);

export const selectFilteredTodoIds = createSelector(
    selectorFilteredTodos,
    (filteredTodos) => filteredTodos.map((todo) => todo.id)
);

export const selectorCompletedTodos = (state: RootState): string[] => {
    const completedTodosIds = state.todos.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);

    return completedTodosIds;
};

export const selectTodoById = (state: RootState, todoId: string) => {
    const selectedTodo = state.todos.todos.find((todo: Todo) => todo.id === todoId);

    if (selectedTodo) {
        return selectedTodo;
    }
};

export const makeSelectorCompletedTodosCount = () =>
    createSelector(
        (state: RootState) => state.todos.todos,
        (_: any, completed: boolean) => completed,
        (todos: Todo[], completed: boolean) =>
            todos.filter(todo => todo.completed === completed).length
    );
