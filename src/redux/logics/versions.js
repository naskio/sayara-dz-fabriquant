import axios from "axios";
import {API} from "../../config/config";
import {fetchDataAction} from "../actions/data";

export const fetchVersions = () => dispatch => {
    return axios.get(API('version')).then(res => {
        dispatch(fetchDataAction('versions', res.data));
    });
};
