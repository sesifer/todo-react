import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "./store/reducers/tasks";
import filtersReducer from "./features/filters/filtersSlice";

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(
//         applyMiddleware(thunk),
//     )
// );
//

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        filters: filtersReducer,
    }
});

export default store;