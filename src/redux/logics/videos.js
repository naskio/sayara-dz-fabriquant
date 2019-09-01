import axios from "axios";
import {API} from "../../config/config";
import {
    fetchDataAction,
    createDataAction,
    deleteDataAction,
    updateDataAction,
    // resetDataAction,
} from "../actions/data";

export const fetchVideos = () => dispatch => {
    return axios.get(API('modele_videos')).then(res => {
        dispatch(fetchDataAction('videos', res.data));
    });
};


export const createVideo = (data) => dispatch => {
    return axios.post(API('modele_videos'), data)
        .then((res) => {
            dispatch(createDataAction('videos', res.data));
            return res.data;
        });
};

export const deleteVideo = (data) => dispatch => {
    return axios.delete(API('modele_videos', data.id))
        .then(() => {
            dispatch(deleteDataAction('videos', data));
            return data;
        });
};

export const updateVideo = (data) => dispatch => {
    return axios.patch(API('modele_videos', data.id), data)
        .then((res) => {
            dispatch(updateDataAction('videos', res.data));
            return res.data;
        });
};
