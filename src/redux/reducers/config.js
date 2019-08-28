import {SET_CONFIG, RESET_CONFIG} from '../actionTypes';

import initialState from '../initialState';

export default (state = initialState.config, action) => {
    switch (action.type) {
        case SET_CONFIG:
            return {
                ...state, ...action.payload
            };
        case RESET_CONFIG:
            return initialState.config;
        default:
            return state;
    }
};
