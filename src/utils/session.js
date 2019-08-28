export const setSessionToken = token => {
    if (token) {
        sessionStorage.setItem('token', token);
    } else {
        sessionStorage.removeItem('token');
    }
};

export const getSessionToken = () => sessionStorage.getItem('token');
