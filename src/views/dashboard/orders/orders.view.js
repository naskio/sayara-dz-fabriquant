import React from 'react';
import {
    Grid, Typography,
} from '@material-ui/core';
import SnackBar from '../../../components/dashboard/snackbar';
import Order from '../../../components/dashboard/order';
import {catcher} from "../../../utils/catcher";

export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSnackBar: false,
            messageSnackBar: '',
            variantSnackBar: 'info',
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

    bookVehicle = (data) => {
        const {bookVehicle} = this.props;
        bookVehicle(data)
            .then(res => {
                console.log('bookVehicle', res);
            })
            .catch(catcher(this.showSnackBar));
    };

    cancelOrder = (data) => {
        const {cancelOrder} = this.props;
        cancelOrder(data)
            .then(res => {
                console.log('CANCEL_ORDER', res);
            })
            .catch(catcher(this.showSnackBar));
    };

    render() {
        const {
            openSnackBar,
            messageSnackBar,
            variantSnackBar,
        } = this.state;
        const {
            orders,
            versions,
            models,
            colors,
            options,
            vehicles,
        } = this.props;
        return (
            <div style={{paddingLeft: 20, marginTop: 24,}}>
                {
                    !(JSON.stringify(orders) === '{}') ?
                        <Grid container item>
                            <Grid container spacing={4} justify="space-around">
                                {Object.entries(orders).map(([k, v]) => (
                                    <Grid key={k} item xs={10} md={6} lg={4}>
                                        <Order
                                            order={v}
                                            model={models[versions[v.version].modele]}
                                            version={versions[v.version]}
                                            color={colors[v.couleur]}
                                            options={v.options.map(id => options[id])}
                                            vehicles={v.vehicules.map(id => vehicles[id])}
                                            vehicle={v.vehicule_choisi ? vehicles[v.vehicule_choisi] : undefined}
                                            bookVehicle={this.bookVehicle}
                                            cancelOrder={this.cancelOrder}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid> :
                        <Typography variant='h6' className='p-5 ml-5 mt-5'>Aucune commande !</Typography>
                }
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
