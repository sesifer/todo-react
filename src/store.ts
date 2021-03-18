import {configureStore} from "@reduxjs/toolkit";
import {filtersSlice} from "./features/filters/filtersSlice";
import {todosSlice} from "./features/todos/todosSlice";
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
        filters: filtersSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
    return useDispatch<AppDispatch>();
}
export default store;

