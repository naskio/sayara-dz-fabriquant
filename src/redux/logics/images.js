import axios from "axios";
import {API} from "../../config/config";
import {
    fetchDataAction,
    createDataAction,
    deleteDataAction,
    updateDataAction,
    // resetDataAction,
} from "../actions/data";

export const fetchImages = () => dispatch => {
    return axios.get(API('modele_images')).then(res => {
        dispatch(fetchDataAction('images', res.data));
    });
};


export const createImage = (data) => dispatch => {
    return axios.post(API('modele_images'), data)
        .then((res) => {
            dispatch(createDataAction('images', res.data));
            return res.data;
        });
};

export const deleteImage = (data) => dispatch => {
    return axios.delete(API('modele_images', data.id))
        .then(() => {
            dispatch(deleteDataAction('images', data));
            return data;
        });
};

export const updateImage = (data) => dispatch => {
    return axios.patch(API('modele_images', data.id), data)
        .then((res) => {
            dispatch(updateDataAction('images', res.data));
            return res.data;
        });
};
