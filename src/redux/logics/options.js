import axios from "axios";
import {API} from "../../config/config";
import {
    fetchDataAction,
    createDataAction,
    deleteDataAction,
    updateDataAction,
    // resetDataAction,
} from "../actions/data";

export const fetchOptions = () => dispatch => {
    return axios.get(API('option')).then(res => {
        dispatch(fetchDataAction('options', res.data));
    });
};


export const createOption = (data) => dispatch => {
    return axios.post(API('option'), data)
        .then((res) => {
            dispatch(createDataAction('options', res.data));
            return res.data;
        });
};

export const deleteOption = (data) => dispatch => {
    return axios.delete(API('option', data.id))
        .then(() => {
            dispatch(deleteDataAction('options', data));
            return data;
        });
};

export const updateOption = (data) => dispatch => {
    return axios.patch(API('option', data.id), data)
        .then((res) => {
            dispatch(updateDataAction('options', res.data));
            return res.data;
        });
};
