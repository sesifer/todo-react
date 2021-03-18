import { createSlice } from "@reduxjs/toolkit";

export const Filters: {[index: string]: string} = {
    All: "all",
    Active: "active",
    Completed: "completed"
};

const initialState: string = Filters.All;

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        filterChanged: (state, {payload}) => state = payload
    }
});

export const {filterChanged} = filtersSlice.actions;

export default filtersSlice.reducer;