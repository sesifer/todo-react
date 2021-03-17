// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BASE_URL} from "../../api/useRequest";
import {Todo, TodosState} from "../../store/types";


// asynchronous thunk to fetch tasks
export const fetchTodos = createAsyncThunk<Todo[]>(
    "todos/fetchTodos",
    async () => {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        return data;
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

        return data;
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
    async (id: string) => {
        const response = await fetch(`${BASE_URL}/${id}/complete`, {
            method: "POST",
        });

        const data = await response.json();

        return data;
    }
);

// asynchronous thunk to mark a task as incomplete
export const incompleteTodo = createAsyncThunk(
    "todos/incompleteTodo",
    async (id: string) => {
        const response = await fetch(`${BASE_URL}/${id}/incomplete`, {
            method: "POST",
        });

        const data = await response.json();

        return data;
    }
);

// asynchronous thunk to update a task
export const updateTodo = createAsyncThunk<Todo, {id: string, text: string}>(
    "todos/updateTodo",
    async ({id, text}) => {
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
    reducers: {
        // slice-specific reducers
        // todoAdded: (state, action) => {
        //     state.todos = [...state.todos, action.payload];
        // },
        // todoCompleted: (state, action) => {
        //     const completedTodo = state.todos.find((todo) => todo.id === action.payload);
        //     if (completedTodo) {
        //         completedTodo.completed = !completedTodo.completed;
        //     }
        // },
        // todoDeleted: (state, action) => {
        //     state.todos.filter(todo => todo.id !== action.payload);
        // },
        // todoUpdated: (state, action) => {
        //     const {id, text} = action.payload;
        //     const updatedTodo = state.todos.find((todo) => todo.id === id);
        //     if (updatedTodo) {
        //         updatedTodo.text = text;
        //     }
        // },
    },
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
                const completedTodo = state.todos.find((todo) => todo.id === payload.id);
                if (completedTodo) {
                    completedTodo.completed = true;
                }
            })
            .addCase(incompleteTodo.fulfilled, (state: TodosState, {payload}) => {
                const incompletedTodo = state.todos.find((todo) => todo.id === payload.id);
                if (incompletedTodo) {
                    incompletedTodo.completed = false;
                }
            });

    }
});

export const action = todosSlice.actions;

export default todosSlice.reducer;

//selectors
// export const selectAllTodos = state = state.todos;
//
// export const selectTodoById = (state, todoId) =>
//     state.todos.find(todo => todo.id === todoId);