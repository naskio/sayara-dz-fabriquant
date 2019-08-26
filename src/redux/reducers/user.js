import {SET_USER, RESET_USER} from '../actionTypes';

import initialState from '../initialState';

export default (state = initialState.user, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state, ...action.payload
            };
        case RESET_USER:
            return initialState.user;
        default:
            return state;
    }
};
