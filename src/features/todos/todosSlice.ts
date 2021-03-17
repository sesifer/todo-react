import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BASE_URL} from "../../api/useRequest";
import {Todo, TodosState} from "./types";
import {RootState} from "../../store";
import {createSelector} from "reselect";

// asynchronous thunk to fetch tasks
export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async () => {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        return data as Todo[];
    }
);

// asynchronous thunk to save a task
export const addNewTodo = createAsyncThunk(
    "todos/addNewTodo",
    async (text: string) => {
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

        return data as Todo;
    }
);

// asynchronous thunk to delete a task
export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id: string) => {
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });

        return id;
    }
);

// asynchronous thunk to complete a task
export const completeTodo = createAsyncThunk(
    "todos/completeTodo",
    async ({ id, isTodoCompleted }: { id: string, isTodoCompleted: boolean }) => {
        const completionAction = isTodoCompleted ? "incomplete" : "complete";
        const response = await fetch(`${BASE_URL}/${id}/${completionAction}`, {
            method: "POST",
        });

        const data = await response.json();

        return data as Todo;
    }
);

// asynchronous thunk to update a task
export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async ({ id, text }: { id: string, text: string }) => {
        const requestData = { text: text };
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        return data as Todo;
    }
);

// potrebujem to?
// asynchronous thunk to get all completed tasks
export const getAllCompletedTodos = createAsyncThunk<Todo[]>(
    "todos/getAllCompletedTodos",
    async () => {
        const response = await fetch(`${BASE_URL}/completed`);
        const data = await response.json();

        return data;
    }
);

const initialState: TodosState = {
    todos: [],
    status: "idle",
    error: null
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
            .addCase(fetchTodos.rejected, (state) => {
                state.status = "failed";
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

//selectors
export const selectorAllTodos = (state: RootState) => state.todos.todos;

export const selectorTodoIds = (state: RootState) => state.todos.todos.map((todo: Todo) => todo.id);

export const selectorFilteredTodos = createSelector(
    (state: RootState) => state.todos.todos,
    (state:RootState) => state.filters,
    (todos, status) => {
        //todo dopis filtre
        if (status === filters.all) {
            return todos;
        }
    }
);
//pozrie sa co za filter je aktivny
//ak je active zavola selector na NOT completed todos
// compelted >>> zavola completedTodosIds


export const selectorCompletedTodos = (state: RootState): string[] => {
    const completedTodosIds = state.todos.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);

    return completedTodosIds;
};