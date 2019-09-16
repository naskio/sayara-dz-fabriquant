import React from 'react';
import {
    Typography,
    Button,
    Paper,
    TextField,
    MenuItem,
} from '@material-ui/core';
// import {CROWN} from "../../../assets/images";
import {simpleContrast} from "../../../utils/colors";
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../styles/material_ui/forms.style';
import orderStatus, {statusColor} from "../../../assets/data/orderStatus";
import {Formik} from "formik";
import * as Yup from "yup";
import ConfirmationDialog from "../confirmationDialog";

class View extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            openConfirmationDialog: false,
            confirmationTitle: '',
            confirmationAction: null,
        };
    }

    toggleConfirmationDialog = () => {
        const {openConfirmationDialog} = this.state;
        this.setState({openConfirmationDialog: !openConfirmationDialog});
    };

    render() {
        const {
            openConfirmationDialog,
            confirmationTitle,
            confirmationAction,
        } = this.state;
        const {
            classes,
            order,
            model,
            version,
            color,
            options,
            cancelOrder,
            bookVehicle,
            vehicles,
            vehicle,
        } = this.props;
        return (
            <React.Fragment>
                <Paper>
                    {
                        version.image &&
                        <img alt='version' src={version.image}
                             style={{
                                 objectFit: 'cover',
                                 width: '100%',
                             }}/>
                    }
                    <div className="row p-3">
                        <Typography variant="h6"
                                    style={{
                                        marginLeft: 16,
                                        color: statusColor(order.etat),
                                    }}>
                            {orderStatus[order.etat]}
                        </Typography>
                    </div>
                    <div className="row p-3">
                        <div className="col">
                            <Typography color='primary' variant="button">
                                Commande
                            </Typography>
                            <div style={{marginLeft: 16,}}>
                                {Object.entries({
                                    Identifiant: order.id,
                                    'Modele': model.nom,
                                    'Version': version.nom,
                                    ...(order.etat === 1 && vehicle ? {
                                        'Nom concessionnaire': vehicle.nom_concessionnaire,
                                        'Numero du chassis': vehicle.numero_chassis,
                                    } : {}),
                                    'Par': `${order.automobiliste.nom} ${order.automobiliste.prenom}`,
                                    'Date': `${order.date}`,
                                    'Montant paye': `${parseInt(order.montant)} DZD`,
                                    'Total': `${parseInt(order.prix_total)} DZD`,
                                }).map(([k, v], ind) =>
                                    <div key={ind}>
                                        <Typography variant="button"
                                                    style={{
                                                        display: "inline",
                                                    }}>
                                            {k}
                                        </Typography>
                                        <Typography variant="body1"
                                                    style={{
                                                        display: "inline",
                                                        marginLeft: 12,
                                                    }}>
                                            {v}
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col">
                            <Typography color='primary' variant="button">
                                Options
                            </Typography>
                            <div style={{marginLeft: 16, marginBottom: 16,}}>
                                {
                                    options.map(id =>
                                        <div key={id.id}>
                                            <Typography variant="button">
                                                {id.nom}
                                            </Typography>
                                        </div>
                                    )
                                }
                            </div>
                            <div style={{marginBottom: 16,}}>
                                <Typography color='primary' variant="button"
                                            style={{
                                                display: "inline",
                                            }}>
                                    Couleur
                                </Typography>
                                <Typography variant="body1"
                                            style={{
                                                display: "inline",
                                                marginLeft: 12,
                                                padding: 6,
                                                borderRadius: 6,
                                                color: simpleContrast(color.code_hexa),
                                                backgroundColor: color.code_hexa,
                                            }}>
                                    {color.nom}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    {
                        !order.etat && (
                            <Formik
                                initialValues={{
                                    vehicule: '',
                                    commande: order.id,
                                }}
                                validationSchema={Yup.object({
                                    vehicule: Yup.number("Choississez le véhicule").required("Ce champs est obligatoire"),
                                    commande: Yup.number("Choisir la commande").required("Ce champs est obligatoire"),
                                })}
                                onSubmit={({vehicule}) => bookVehicle(order, {id: vehicule})}
                                render={props => {
                                    const {
                                        values: {
                                            vehicule,
                                        },
                                        errors,
                                        touched,
                                        handleSubmit,
                                        handleChange,
                                        handleBlur,
                                        isValid,
                                        isSubmitting,
                                    } = props;
                                    return (
                                        <>
                                            {
                                                vehicles ? <form noValidate>
                                                        <TextField
                                                            select
                                                            margin="normal"
                                                            name="vehicule"
                                                            className={classes.textField}
                                                            placeholder="Le véhicule"
                                                            label="Le véhicule"
                                                            helperText={touched.vehicule ? errors.vehicule : ""}
                                                            error={touched.vehicule && Boolean(errors.vehicule)}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={vehicule}
                                                        >
                                                            {
                                                                vehicles.map(v => (
                                                                    <MenuItem key={v.id} value={v.id}>
                                                                        {`${v.nom_concessionnaire} "${v.numero_chassis}"`}
                                                                    </MenuItem>
                                                                ))
                                                            }
                                                        </TextField>
                                                    </form>
                                                    :
                                                    <Typography>Aucun véhicule disponible !</Typography>
                                            }
                                            <div className="d-flex flex-row justify-content-end mt-5 mb-5">
                                                <Button onClick={
                                                    () => {
                                                        this.setState({
                                                                confirmationAction: () => {
                                                                    this.toggleConfirmationDialog();
                                                                    cancelOrder(order);
                                                                },
                                                                confirmationTitle: `Etes-vous sûr de vouloir rejeter 
                                                            la commande  de ${order.automobiliste.nom} 
                                                            ${order.automobiliste.prenom} ? 
                                                            Cette action est irréversible`,
                                                            },
                                                            this.toggleConfirmationDialog);
                                                    }
                                                }
                                                        color='primary'
                                                        variant="text"
                                                        className="mr-4"
                                                >
                                                    REJETER
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    onClick={handleSubmit}
                                                    type="submit"
                                                    variant="contained"
                                                    disabled={!isValid || isSubmitting || !vehicles}
                                                >
                                                    ACCEPTER
                                                </Button>
                                            </div>
                                        </>
                                    );
                                }}
                            />
                        )
                    }
                </Paper>
                {
                    openConfirmationDialog && <ConfirmationDialog
                        open={openConfirmationDialog}
                        title="Confirmation de Refus"
                        content={confirmationTitle}
                        handleAgree={confirmationAction}
                        handleClose={this.toggleConfirmationDialog}
                        handleDisagree={this.toggleConfirmationDialog}
                    />
                }
            </React.Fragment>
        )
            ;
    }
}

export default withStyles(styles)(View);
