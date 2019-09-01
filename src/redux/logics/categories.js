import axios from "axios";
import {API} from "../../config/config";
import {
    fetchDataAction,
    // createDataAction,
    // deleteDataAction,
    // updateDataAction,
    // resetDataAction,
} from "../actions/data";

export const fetchCategories = () => dispatch => {
    return axios.get(API('category')).then(res => {
        dispatch(fetchDataAction('categories', res.data));
    });
};
