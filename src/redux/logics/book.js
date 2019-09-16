import axios from "axios";
import {API} from "../../config/config";
import {
    updateDataAction,
} from "../actions/data";

export const bookVehicle = (commande, vehicule) => dispatch => {
    return axios.post(API('reserver_vehicule'), {
        commande: commande.id,
        vehicule: vehicule.id,
    })
        .then(() => {
            dispatch(updateDataAction('orders', {
                id: commande.id,
                vehicule_choisi: vehicule.id,
                etat: 1,
            }));
            dispatch(updateDataAction('vehicles', {
                id: vehicule.id,
                disponible: false,
            }));
        });
};

export const cancelOrder = (data) => dispatch => {
    return axios.patch(API('commande', data.id), {
        id: data.id,
        etat: 2,
    })
        .then((res) => {
            dispatch(updateDataAction('orders', res.data));
            return res.data;
        });
};
