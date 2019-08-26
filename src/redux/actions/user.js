import {SET_USER, RESET_USER} from "../actionTypes";


export const setUserAction = (user) => ({
    type: SET_USER,
    payload: user,
});

export const resetUserAction = () => ({
    type: RESET_USER,
});
