export const catcher = (showSnackBar) => (err) => {
    if (err.response && err.response.data) {
        if (err.response.data) {
            showSnackBar(`${err.response.status}: ${JSON.stringify(err.response.data)}`, 'error');
        } else {
            showSnackBar(`Error Code ${err.response.status}`, 'error');
        }
    } else {
        showSnackBar('Une erreur inconnue est servenue (Server Error).', 'error');
    }
};
