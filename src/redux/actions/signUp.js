import {SET_SIGN_UP, RESET_SIGN_UP} from "../actionTypes";


export const setSignUpAction = (payload) => ({
    type: SET_SIGN_UP,
    payload,
});

export const resetSignUpAction = () => ({
    type: RESET_SIGN_UP,
});
