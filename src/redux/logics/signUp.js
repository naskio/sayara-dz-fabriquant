import axios from "axios";
import {API} from "../../config/config";
import {setSignUpAction} from "../actions/signUp";

export const createSubscription = (data) => dispatch => {
    return axios.post(`${API}/subscription/`, data)
        .then(res => {
            console.log(res);
            dispatch(setSignUpAction({isSignedUp: true}));
        });
};
