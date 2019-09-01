import axios from "axios";
import {API} from "../../config/config";
import {
    fetchDataAction,
    createDataAction,
    deleteDataAction,
    updateDataAction,
    // resetDataAction,
} from "../actions/data";

export const fetchColors = () => dispatch => {
    return axios.get(API('couleur')).then(res => {
        dispatch(fetchDataAction('colors', res.data));
    });
};


export const createColor = (data) => dispatch => {
    return axios.post(API('couleur'), data)
        .then((res) => {
            dispatch(createDataAction('colors', res.data));
            return res.data;
        });
};

export const deleteColor = (data) => dispatch => {
    return axios.delete(API('couleur', data.id))
        .then(() => {
            dispatch(deleteDataAction('colors', data));
            return data;
        });
};

export const updateColor = (data) => dispatch => {
    return axios.patch(API('couleur', data.id), data)
        .then((res) => {
            dispatch(updateDataAction('colors', res.data));
            return res.data;
        });
};
