import React from 'react';
import {
    Tooltip,
    IconButton,
    Hidden,
    Dialog,
    Typography, Paper,
} from '@material-ui/core';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    List as ListIcon, CloudUploadSharp as CloudIcon,
} from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import Form from './stock.form';
import SnackBar from '../../../components/dashboard/snackbar';
import ConfirmationDialog from "../../../components/dashboard/confirmationDialog";
import OptionsList from './../../../components/list';
import {catcher} from "../../../utils/catcher";

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
        const {createVehicle} = this.props;
        console.log('REQUEST:', data);
        createVehicle(data)
            .then(res => {
                this.showSnackBar(`le Vehicule ${res.numero_chassis} a été créé avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    update = data => {
        this.toggleDialog();
        const {updateVehicle} = this.props;
        console.log('REQUEST:', data);
        updateVehicle(data)
            .then(res => {
                this.showSnackBar(`le Vehicule ${res.numero_chassis} a été modifié avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    delete = data => {
        this.toggleConfirmationDialog();
        const {deleteVehicle} = this.props;
        console.log('REQUEST:', data);
        deleteVehicle(data)
            .then(res => {
                this.showSnackBar(`le Vehicule ${res.numero_chassis} a été supprimé avec succès.`, 'success');
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
            name: 'numero_chassis',
            label: 'Numéro de chassis',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'nom_concessionnaire',
            label: 'Nom de concessionnaire',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'version',
            label: 'Version',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'couleur',
            label: 'Couleur',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'options',
            label: 'Options',
            options: {
                filter: false,
                sort: false,
            },
        },
        // {
        //     name: 'disponible',
        //     label: 'Status',
        //     options: {
        //         filter: true,
        //         sort: true,
        //     },
        // },
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
                noMatch: "Aucun véhicule existante.",
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
            <Tooltip title="Ajouter un véhicule" aria-label="Ajouter">
                <IconButton
                    onClick={() => {
                        this.setState({
                                formOnSubmit: this.create,
                                formInitialValues: {
                                    numero_chassis: '',
                                    version: '',
                                    couleur: '',
                                    options: [],
                                    nom_concessionnaire: ''
                                },
                                formTitle: 'Ajouter un Véhicule',
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
            const {uploadVehicles} = this.props;
            uploadVehicles(form)
                .then(res => {
                    this.showSnackBar(`le fichier stock a été uploader avec succès.`, 'success');
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
            versions,
            colors,
            options,
            vehicles,
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
                            Uploader un nouveau fichier du stock
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
                <Hidden xsDown>
                    <MUIDataTable
                        title="Gestion du stock"
                        data={
                            Object.entries(vehicles).map(([k, v]) =>
                                [
                                    v.id,
                                    <Typography variant="h6" style={{paddingLeft: 16}}>
                                        {v.numero_chassis}
                                    </Typography>,
                                    v.nom_concessionnaire,
                                    versions && versions[v.version] ? versions[v.version].nom : '',
                                    colors && colors[v.couleur] ? colors[v.couleur].nom : '',
                                    <OptionsList icon={ListIcon} id={v.id} list={v.options.map(key => options[key])}
                                                 field='nom'/>,
                                    // v.disponible,
                                    <>
                                        <IconButton color="inherit" onClick={
                                            () => {
                                                this.setState({
                                                        formOnSubmit: this.update,
                                                        formInitialValues: {
                                                            id: v.id,
                                                            numero_chassis: v.numero_chassis,
                                                            version: v.version,
                                                            couleur: v.couleur,
                                                            options: v.options || [],
                                                            nom_concessionnaire: v.nom_concessionnaire,
                                                        },
                                                        formTitle: `Modifier le Vehicule ${v.numero_chassis}`,
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
                                                            le vehicule ${v.numero_chassis} ? 
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
                                colors={colors}
                                options_all={options}
                                versions={versions}
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
