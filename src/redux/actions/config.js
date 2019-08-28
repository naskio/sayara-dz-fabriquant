import {SET_CONFIG, RESET_CONFIG} from "../actionTypes";


export const setConfigAction = (payload) => ({
    type: SET_CONFIG,
    payload,
});

export const resetConfigAction = () => ({
    type: RESET_CONFIG,
});
