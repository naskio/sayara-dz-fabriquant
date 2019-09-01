const styles = theme => ({
    container: {
        display: 'flex',
        // flexDirection: 'column',
        flexWrap: 'wrap',
    },
    textFieldEdit: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
        minWidth: 250,
    },
    textFieldFull: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500 + theme.spacing(1),
    },
    title: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
    },
});

export default styles;
