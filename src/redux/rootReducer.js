import {combineReducers} from "redux";

import user from "./reducers/user";


// mapping the name of a reducer to the reducer function (=> state : { messages:{ ... }, ... })
export default combineReducers({
    // blank: function (state, action) {
    //     if (state == null) state = [];
    //     return state;
    // }
    user,
    // config,
    // dedication,
    // track_player,
    // now_playing,
    // now_playing_socket,
});
