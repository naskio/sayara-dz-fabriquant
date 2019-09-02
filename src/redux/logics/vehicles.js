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

export const fetchVehicles = () => dispatch => {
    return axios.get(API('vehicule')).then(res => {
        dispatch(fetchDataAction('vehicles', res.data));
    });
};


export const createVehicle = (data) => dispatch => {
    return axios.post(API('vehicule'), data)
        .then((res) => {
            dispatch(createDataAction('vehicles', res.data));
            return res.data;
        });
};

export const deleteVehicle = (data) => dispatch => {
    return axios.delete(API('vehicule', data.id))
        .then(() => {
            dispatch(deleteDataAction('vehicles', data));
            return data;
        });
};

export const updateVehicle = (data) => dispatch => {
    return axios.patch(API('vehicule', data.id), data)
        .then((res) => {
            dispatch(updateDataAction('vehicles', res.data));
            return res.data;
        });
};

export const uploadVehicles = (data) => dispatch => {
    console.log(data);
    return axios.post(API('stock_upload'), data, {
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
