export const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const BASE_NAME = IS_DEV ? '' : '/sayara-dz-fabriquant';

// export const API = 'https://siyara-dz-backend-production.herokuapp.com';
const URL = 'https://siyara-dz-backend-staging.herokuapp.com';

export const API = (model = undefined, id = undefined) => {
    if (model && id) {
        return `${URL}/api/${model}/${id}/`;
    }
    if (model) {
        return `${URL}/api/${model}/`;
    }
    return `${URL}/api/`;
};

export const ENABLE_IMAGE_URL = IS_DEV && true;


