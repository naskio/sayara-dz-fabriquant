import React from 'react';
import {
    Tooltip,
    IconButton,
    Hidden,
    Dialog,
    Paper,
    Typography,
} from '@material-ui/core';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    CloudUploadSharp as CloudIcon,
} from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import Form from './pricing.form';
import SnackBar from '../../../components/dashboard/snackbar';
import ConfirmationDialog from "../../../components/dashboard/confirmationDialog";
import types from '../../../assets/data/pricingTypes';
import {catcher} from "../../../utils/catcher";

const reduceObjectId = (data) => {
    return Object.entries(data).reduce(
        (total, item) => {
            const [k, v] = item;
            if (k === 'object_id') {
                total[types[data.type].field] = v;
            } else {
                total[k] = v;
            }
            return total;
        }, {});
};

export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            openSnackBar: false,
            messageSnackBar: '',
            variantSnackBar: 'info',
            formOnSubmit: null,
            formInitialValues: {},
            formTitle: '',
            openConfirmationDialog: false,
            confirmationTitle: '',
            confirmationAction: null,
        };
        this.uploaderRef = React.createRef();
    }

    toggleConfirmationDialog = () => {
        const {openConfirmationDialog} = this.state;
        this.setState({openConfirmationDialog: !openConfirmationDialog});
    };

    toggleDialog = () => {
        const {openDialog} = this.state;
        this.setState({openDialog: !openDialog,});
    };

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

    create = data => {
        this.toggleDialog();
        const {createPricing} = this.props;
        console.log('REQUEST:', reduceObjectId(data));
        createPricing(reduceObjectId(data))
            .then(res => {
                this.showSnackBar(`la Tarification a été créé avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    update = data => {
        this.toggleDialog();
        const {updatePricing} = this.props;
        console.log('REQUEST:', reduceObjectId(data));
        updatePricing(reduceObjectId(data))
            .then(res => {
                this.showSnackBar(`la Tarification a été modifié avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    delete = data => {
        this.toggleConfirmationDialog();
        const {deletePricing} = this.props;
        console.log('REQUEST:', reduceObjectId(data));
        deletePricing(reduceObjectId(data))
            .then(res => {
                this.showSnackBar(`la Tarification a été supprimé avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    columns = [
        {
            name: "id",
            options: {
                display: "excluded",
                filter: false,
                sort: false,
                download: false,
            },
        },
        {
            name: 'prix',
            label: 'Prix (DZD)',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'type',
            label: 'Type de tarification',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'tarification',
            label: 'Tarification',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'date_debut',
            label: 'Date Début',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'date_fin',
            label: 'Date Fin',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'actions',
            label: 'Actions',
            options: {
                filter: false,
                sort: false,
                print: false,
                download: false,
            },
        },
    ];

    options = {
        filterType: 'checkbox',
        rowsPerPage: 10,
        textLabels: {
            body: {
                noMatch: "Aucune tarification existante.",
                toolTip: "Trier",
            },
            pagination: {
                next: 'Suivant',
                previous: 'Précédent',
                rowsPerPage: 'Lignes par page',
                displayRows: 'de',
            },
            toolbar: {
                search: 'Recherche',
                downloadCsv: 'Télécharger CSV',
                print: 'Imprimer',
                viewColumns: 'Vue Colonnes',
                filterTable: 'Filtrer',
            },
            filter: {
                all: 'Tous',
                title: 'Filtres',
                reset: 'Réinitialiser',
            },
            viewColumns: {
                title: 'Afficher colonnes',
                titleAria: 'Afficher/Masquer des Colonnes',
            },
            selectedRows: {
                text: 'Lignes sélectionnées',
                delete: 'Supprimer',
                deleteAria: 'Supprimer la selection',
            },
        },
        customToolbar: () => (
            <Tooltip title="Ajouter une Tarification" aria-label="Ajouter">
                <IconButton
                    onClick={() => {
                        this.setState({
                                formOnSubmit: this.create,
                                formInitialValues: {
                                    prix: '',
                                    type: '',
                                    object_id: '',
                                    date_debut: '',
                                    date_fin: '',
                                    modele: '',
                                },
                                formTitle: 'Ajouter une Tarification',
                            },
                            this.toggleDialog);
                    }}
                >
                    <AddIcon/>
                </IconButton>
            </Tooltip>
        ),
        selectableRows: 'none',
    };

    uploadPricingFile = event => {
        if (event && event.target && event.target.files && event.target.files.length) {
            const file = event.target.files[0];
            const form = new FormData();
            form.append('file', file);
            const {uploadPricing} = this.props;
            uploadPricing(form)
                .then(res => {
                    this.showSnackBar(`la Tarification a été uploader avec succès.`, 'success');
                })
                .catch(catcher(this.showSnackBar));
        }
    };

    render() {
        const {
            openDialog,
            openSnackBar,
            messageSnackBar,
            variantSnackBar,
            formOnSubmit,
            formInitialValues,
            formTitle,
            openConfirmationDialog,
            confirmationTitle,
            confirmationAction,
        } = this.state;
        const {
            // classes,
            options,
            versions,
            colors,
            pricing,
            models,
        } = this.props;
        return (
            <div>
                <div className="d-flex flex-column justify-content-center align-items-center mb-5 mt-4">
                    <Paper onClick={() => {
                        this.uploaderRef.current.click();
                    }}
                           className="d-flex flex-row justify-content-between align-items-center p-4"
                    >
                        <Typography variant="h6" component="h6">
                            Uploader un nouveau fichier de tarification
                        </Typography>
                        <span style={{
                            fontSize: 64,
                            width: 64,
                            height: 64,
                        }} className="p-0 m-0 ml-3">
                                <CloudIcon fontSize='inherit'/>
                            </span>
                        <input
                            className="d-none"
                            hidden
                            type="file"
                            accept=".csv, .txt"
                            name="file"
                            onChange={this.uploadPricingFile}
                            ref={this.uploaderRef}
                        />
                    </Paper>
                </div>
                <
                    Hidden
                    xsDown>
                    < MUIDataTable
                        title="Gestion des tarifs"
                        data={
                            Object.entries(pricing).map(([k, v]) =>
                                [
                                    v.id,
                                    v.prix,
                                    types[v.type].label,
                                    this.props[types[v.type].collection] ?
                                        this.props[types[v.type].collection][v[types[v.type].field]].nom : '',
                                    v.date_debut,
                                    v.date_fin,
                                    <>
                                        <IconButton color="inherit" onClick={
                                            () => {
                                                this.setState({
                                                        formOnSubmit: this.update,
                                                        formInitialValues: {
                                                            id: v.id,
                                                            prix: v.prix,
                                                            type: v.type,
                                                            object_id: v[types[v.type].field],
                                                            date_debut: v.date_debut,
                                                            date_fin: v.date_fin,
                                                            modele: this.props[types[v.type].collection][v[types[v.type].field]].modele,
                                                        },
                                                        formTitle: `Modifier les tarifs de ${this.props[types[v.type].collection].nom}`,
                                                    },
                                                    this.toggleDialog);
                                            }
                                        }>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton color="inherit" onClick={
                                            () => {
                                                this.setState({
                                                        confirmationAction: () => this.delete(v),
                                                        confirmationTitle: `Etes-vous sûr de vouloir supprimer 
                                                            la tarification ${this.props[types[v.type].collection].nom} ? 
                                                            Cette action est irréversible`,
                                                    },
                                                    this.toggleConfirmationDialog);
                                            }
                                        }>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </>
                                ]
                            ).reverse()
                        }
                        columns={this.columns}
                        options={this.options}
                    />
                </Hidden>

                {/*Edit and new form*/}
                <Dialog
                    open={openDialog}
                    onClose={this.toggleDialog}
                >
                    {
                        openDialog && (
                            <Form
                                title={formTitle}
                                onSubmit={formOnSubmit}
                                initialValues={formInitialValues}
                                onCancel={this.toggleDialog}
                                versions={versions}
                                colors={colors}
                                options={options}
                                models={models}
                            />
                        )
                    }
                </Dialog>

                {/*Confirmation du suppression*/}
                {
                    openConfirmationDialog && <ConfirmationDialog
                        open={openConfirmationDialog}
                        title="Confirmation de Suppression"
                        content={confirmationTitle}
                        handleAgree={confirmationAction}
                        handleClose={this.toggleConfirmationDialog}
                        handleDisagree={this.toggleConfirmationDialog}
                    />
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
