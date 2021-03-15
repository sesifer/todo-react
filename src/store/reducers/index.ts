import {combineReducers} from "redux";
import {tasksReducer} from "./tasks";
import happyReducer from "./isHappy";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    isHappy: happyReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;