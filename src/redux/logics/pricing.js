import axios from "axios";
import {API} from "../../config/config";
import {
    fetchDataAction,
    createDataAction,
    deleteDataAction,
    updateDataAction,
    // uploadDataAction,
    // resetDataAction,
} from "../actions/data";

export const fetchPricing = () => dispatch => {
    return axios.get(API('ligne_tarif')).then(res => {
        dispatch(fetchDataAction('pricing', res.data));
    });
};


export const createPricing = (data) => dispatch => {
    return axios.post(API('ligne_tarif'), data)
        .then((res) => {
            dispatch(createDataAction('pricing', res.data));
            return res.data;
        });
};

export const deletePricing = (data) => dispatch => {
    return axios.delete(API('ligne_tarif', data.id))
        .then(() => {
            dispatch(deleteDataAction('pricing', data));
            return data;
        });
};

export const updatePricing = (data) => dispatch => {
    return axios.patch(API('ligne_tarif', data.id), data)
        .then((res) => {
            dispatch(updateDataAction('pricing', res.data));
            return res.data;
        });
};


export const uploadPricing = (data) => dispatch => {
    console.log(data);
    return axios.post(API('ligne_tarif_upload'), data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then((res) => {
            console.log('UPLOAD', res.data);
            // TODO: check results and add it
            // dispatch(uploadDataAction('pricing', res.data));
            return res.data;
        });
};
