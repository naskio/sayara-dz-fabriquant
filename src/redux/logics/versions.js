import axios from "axios";
import {API} from "../../config/config";
import {
    fetchDataAction,
    createDataAction,
    deleteDataAction,
    updateDataAction,
    // resetDataAction,
} from "../actions/data";

export const fetchVersions = () => dispatch => {
    return axios.get(API('version')).then(res => {
        dispatch(fetchDataAction('versions', res.data));
    });
};


export const createVersion = (data) => dispatch => {
    return axios.post(API('version'), data)
        .then((res) => {
            dispatch(createDataAction('versions', res.data));
            return res.data;
        });
};

export const deleteVersion = (data) => dispatch => {
    return axios.delete(API('version', data.id))
        .then(() => {
            dispatch(deleteDataAction('versions', data));
            return data;
        });
};

export const updateVersion = (data) => dispatch => {
    return axios.patch(API('version', data.id), data)
        .then((res) => {
            dispatch(updateDataAction('versions', res.data));
            return res.data;
        });
};
