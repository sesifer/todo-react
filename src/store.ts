import {configureStore} from "@reduxjs/toolkit";
import {filtersSlice} from "./features/filters/filtersSlice";
import {todosSlice} from "./features/todos/todosSlice";

const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
        filters: filtersSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>

export default store;

