import axios from "axios";
import {API} from "../../config/config";
import {
    fetchDataAction,
    createDataAction,
    deleteDataAction,
    updateDataAction,
    // resetDataAction,
} from "../actions/data";

export const fetchModels = () => dispatch => {
    return axios.get(API('modele')).then(res => {
        dispatch(fetchDataAction('models', res.data));
    });
};


export const createModel = (data) => dispatch => {
    return axios.post(API('modele'), data)
        .then((res) => {
            dispatch(createDataAction('models', res.data));
            return res.data;
        });
};

export const deleteModel = (data) => dispatch => {
    return axios.delete(API('modele', data.id))
        .then(() => {
            dispatch(deleteDataAction('models', data));
            return data;
        });
};

export const updateModel = (data) => dispatch => {
    return axios.patch(API('modele', data.id), data)
        .then((res) => {
            dispatch(updateDataAction('models', res.data));
            return res.data;
        });
};
