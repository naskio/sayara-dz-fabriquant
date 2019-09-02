import axios from "axios";
import {API} from "../../config/config";

export const simulate = (data) => {
    return axios.post(API('compose_vehicule'), data)
        .then((res) => {
            return res.data;
        });
};
