import React from 'react';
import {
    // Tooltip,
    // IconButton,
    Hidden,
    Grid,
    // Dialog,
    // Paper,
    Typography,
} from '@material-ui/core';
// import {
//     Add as AddIcon,
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     CloudUploadSharp as CloudIcon,
// } from '@material-ui/icons';
import SnackBar from '../../../components/dashboard/snackbar';
import {catcher} from "../../../utils/catcher";

// TODO: display orders, reserve API too,add notifications
export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSnackBar: false,
            messageSnackBar: '',
            variantSnackBar: 'info',
            formInitialValues: {},
            formTitle: '',
        };
    }

    toggleSnackBar = () => {
        const {openSnackBar} = this.state;
        this.setState({openSnackBar: !openSnackBar,});
    };

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.toggleSnackBar();
    };

    showSnackBar = (message, variant = 'info') => {
        this.setState({
            openSnackBar: true,
            messageSnackBar: message,
            variantSnackBar: variant,
        });
    };

    // simulate = (data) => {
    //     const {simulate} = this.props;
    //     simulate(data)
    //         .then(res => {
    //             console.log('res', res);
    //         })
    //         .catch(catcher(this.showSnackBar));
    // };

    render() {
        const {
            openSnackBar,
            messageSnackBar,
            variantSnackBar,
            formInitialValues,
            formTitle,
        } = this.state;
        const {
            orders,
            versions,
            models,
            colors,
            options,
        } = this.props;
        return (
            <div style={{paddingLeft: 20}}>
                <Typography variant="h5" gutterBottom component="h4">
                    Commandes
                </Typography>

                <Grid container item>
                    <Grid container spacing={4} justify="space-around">
                        {Object.entries(orders).map(([k, v]) => (
                            <Grid key={k} item xs={6} md={4} lg={3}>
                                {v.date}
                                {/*<Commande commande={x} handleChangeCommandeState={this.handleChangeStateCommande} />*/}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/*message SnackBar*/}
                {
                    openSnackBar && <SnackBar
                        open={openSnackBar}
                        handleClose={this.handleCloseSnackBar}
                        message={messageSnackBar}
                        variant={variantSnackBar}
                    />
                }
            </div>
        );
    }
}
