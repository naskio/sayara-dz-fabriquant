import axios from "axios";
import {API} from "../../config/config";
import {setAuthorizationToken} from "../../utils/axios";
import {setConfigAction} from "../actions/config";
import {setUserAction} from "../actions/user";
import {setSessionToken} from "../../utils/session";
import {setIsLoaded} from "./config";

export const login = (data) => dispatch => {
    const {password, username, remember_me} = data;
    dispatch(setConfigAction({remember_me}));
    return axios.post(API('auth_web_user'), {password, username})
        .then((res) => {
            const {token} = res.data;
            setAuthorizationToken(token);
            setSessionToken(token);
            if (remember_me) {
                dispatch(setUserAction({token}));
            } else {
                dispatch(setUserAction({token: ''}));
            }
        });
};

export const logout = () => dispatch => {
    setAuthorizationToken();
    setSessionToken();
    dispatch(setUserAction({token: ''}));
    dispatch(setIsLoaded(false));
};

export const fetchProfile = () => dispatch => {
    return axios.get(API('profile')).then(res => {
        dispatch(setUserAction(res.data));
        return res.data;
    });
};

export const setPassword = ({token, password}) => dispatch => {
    return axios.post(API('set_password'), {token, password}).then(() => {
        setAuthorizationToken(token);
        setSessionToken(token);
        dispatch(setUserAction({token}));
    });
};
