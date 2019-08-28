import {SET_USER, RESET_USER} from "../actionTypes";


export const setUserAction = (payload) => ({
    type: SET_USER,
    payload,
});

export const resetUserAction = () => ({
    type: RESET_USER,
});
