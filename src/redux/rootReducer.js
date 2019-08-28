import {combineReducers} from "redux";

import user from "./reducers/user";
import signUp from "./reducers/signUp";
import config from "./reducers/config";


// mapping the name of a reducer to the reducer function (=> state : { messages:{ ... }, ... })
export default combineReducers({
    // blank: function (state, action) {
    //     if (state == null) state = [];
    //     return state;
    // }
    user,
    signUp,
    config,
});
