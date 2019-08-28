import axios from "axios";
import {API} from "../../config/config";
import {setAuthorizationToken} from "../../utils/axios";
import {setConfigAction} from "../actions/config";
import {setUserAction} from "../actions/user";

export const login = (data) => dispatch => {
    const {password, username, remember_me} = data;
    dispatch(setConfigAction({remember_me}));
    return axios.post(API('auth_web_user'), {password, username})
        .then((res) => {
            console.log(res);
            const {token} = res.data;
            setAuthorizationToken(token);
            if (remember_me) {
                dispatch(setUserAction({token}));
            }
        });
};
