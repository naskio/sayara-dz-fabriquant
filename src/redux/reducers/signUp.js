import {SET_SIGN_UP, RESET_SIGN_UP} from '../actionTypes';

import initialState from '../initialState';

export default (state = initialState.signUp, action) => {
    switch (action.type) {
        case SET_SIGN_UP:
            return {
                ...state, ...action.payload
            };
        case RESET_SIGN_UP:
            return initialState.signUp;
        default:
            return state;
    }
};
