export const API = 'https://siyara-dz-backend-staging.herokuapp.com';
// export const API = 'https://siyara-dz-backend-production.herokuapp.com';

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const BASE_NAME = dev? '':'/sayara-dz-fabriquant';
