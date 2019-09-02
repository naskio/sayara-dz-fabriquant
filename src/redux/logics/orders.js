import axios from "axios";
import {API} from "../../config/config";
import {
    fetchDataAction,
    createDataAction,
    deleteDataAction,
    updateDataAction,
    // resetDataAction,
} from "../actions/data";

export const fetchOrders = () => dispatch => {
    return axios.get(API('commande')).then(res => {
        dispatch(fetchDataAction('orders', res.data));
    });
};


export const createOrder = (data) => dispatch => {
    return axios.post(API('commande'), data)
        .then((res) => {
            dispatch(createDataAction('orders', res.data));
            return res.data;
        });
};

export const deleteOrder = (data) => dispatch => {
    return axios.delete(API('commande', data.id))
        .then(() => {
            dispatch(deleteDataAction('orders', data));
            return data;
        });
};

export const updateOrder = (data) => dispatch => {
    return axios.patch(API('commande', data.id), data)
        .then((res) => {
            dispatch(updateDataAction('orders', res.data));
            return res.data;
        });
};
