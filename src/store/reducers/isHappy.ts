import {SET_HAPPINESS, SetHappinessAction} from "../types";

const initialState: boolean = false;

const happyReducer = (state = initialState, action: SetHappinessAction): boolean => {
    switch (action.type) {
        case SET_HAPPINESS:
            return !state;

        default:
            return state;
    }
};

export default happyReducer;