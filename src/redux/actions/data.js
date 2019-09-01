import {FETCH_DATA, RESET_DATA, UPDATE_DATA, DELETE_DATA, CREATE_DATA} from "../actionTypes";


export const resetDataAction = (category) => ({
    type: RESET_DATA,
    category,
});

export const fetchDataAction = (category, payload) => ({
    type: FETCH_DATA,
    category,
    payload,
});

export const updateDataAction = (category, payload) => ({
    type: UPDATE_DATA,
    category,
    payload,
});

export const deleteDataAction = (category, payload) => ({
    type: DELETE_DATA,
    category,
    payload,
});

export const createDataAction = (category, payload) => ({
    type: CREATE_DATA,
    category,
    payload,
});

