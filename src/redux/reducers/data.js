import {FETCH_DATA, RESET_DATA, CREATE_DATA, DELETE_DATA, UPDATE_DATA, UPLOAD_DATA} from '../actionTypes';

import initialState from '../initialState';

export default (state = initialState.data, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state, [action.category]:
                    action.payload.reduce((obj, item) => {
                        obj[item.id] = item;
                        return obj;
                    }, {}),
            };
        case DELETE_DATA: {
            let clone = Object.assign({}, state[action.category]);
            delete clone[action.payload.id];
            return {
                ...state, [action.category]: clone,
            };
        }
        case CREATE_DATA: {
            let clone = Object.assign({}, state[action.category]);
            clone[action.payload.id] = action.payload;
            return {
                ...state, [action.category]: clone,
            };
        }
        case UPDATE_DATA:
            let clone = Object.assign({}, state[action.category]);
            clone[action.payload.id] = {...(clone[action.payload.id]), ...action.payload};
            return {
                ...state, [action.category]: clone,
            };
        case RESET_DATA:
            return {
                ...state, [action.category]: initialState.data[action.category],
            };
        case UPLOAD_DATA: {
            return {
                ...state,
                [action.category]: {
                    ...state[action.category],
                    ...action.payload.reduce((obj, item) => {
                        obj[item.id] = item;
                        return obj;
                    }, {})
                },
            };
        }
        default:
            return state;
    }
};
