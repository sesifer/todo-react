import { createSlice } from "@reduxjs/toolkit";

const filters = {
    all: "all",
    active: "active",
    completed: "completed"
};

const initialState = filters.all;

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        filterChanged: (state, action) => {
            state = action.payload;
        }
    }
});

export const filterChanged = filtersSlice.actions;

export default filtersSlice.reducer;