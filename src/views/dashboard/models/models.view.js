import React from 'react';
import {
    Tooltip,
    IconButton,
    Hidden,
    Dialog,
    Typography,
} from '@material-ui/core';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import Form from './models.form';
import SnackBar from '../../../components/dashboard/snackbar';
import ConfirmationDialog from "../../../components/dashboard/confirmationDialog";
import Logo from '../../../components/Logo';
import ImageDialog from "../../../components/dashboard/imageDialog";
import {catcher} from "../../../utils/catcher";


// Add show options
// Add show colors
export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: props.models,
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
            openImageDialog: false,
            imageDialogUrl: '',
        };
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     const {models} = this.props;
    //     if (prevProps.models !== models) {
    //         this.setState({data: models});
    //     }
    // }
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

    toggleImageDialog = () => {
        const {openImageDialog} = this.state;
        this.setState({openImageDialog: !openImageDialog,});
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
        const {createModel} = this.props;
        console.log('REQUEST:', data);
        createModel(data)
            .then(res => {
                this.showSnackBar(`Modèle ${res.nom} a été créé avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    update = data => {
        this.toggleDialog();
        const {updateModel} = this.props;
        console.log('REQUEST:', data);
        updateModel(data)
            .then(res => {
                this.showSnackBar(`Modèle ${res.nom} a été modifié avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    delete = data => {
        this.toggleConfirmationDialog();
        const {deleteModel} = this.props;
        console.log('REQUEST:', data);
        deleteModel(data)
            .then(res => {
                this.showSnackBar(`Modèle ${res.nom} a été supprimé avec succès.`, 'success');
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
            name: 'nom',
            label: 'Nom',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'code_modele',
            label: 'Code',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'prix_base',
            label: 'Prix de base (DZD)',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'disponible',
            label: 'Disponibilité (Unité)',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'image',
            label: 'Image',
            options: {
                filter: false,
                sort: false,
                print: false,
                download: false,
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
                noMatch: "Aucun modèle existant.",
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
        // onRowsDelete: (rowsDeleted) => {
        //     const {data} = this.state;
        //     console.log(data);
        //     const ids = rowsDeleted.data.map(i => data[i.dataIndex].id);
        //     console.log('TO DELETE', ids);
        //     return false;
        // },
        customToolbar: (props) => (
            <Tooltip title="Ajouter un modèle" aria-label="Ajouter">
                <IconButton
                    onClick={() => {
                        this.setState({
                                formOnSubmit: this.create,
                                formInitialValues: {
                                    nom: '',
                                    code_modele: '',
                                    prix_base: '',
                                },
                                formTitle: 'Ajouter Un Modèle',
                            },
                            this.toggleDialog);
                    }}
                >
                    <AddIcon/>
                </IconButton>
            </Tooltip>
        ),
        // customToolbarSelect: () => (<></>),
        selectableRows: 'none',
    };

    render() {
        const {
            openDialog, openSnackBar, messageSnackBar, variantSnackBar,
            formOnSubmit,
            formInitialValues,
            formTitle,
            openConfirmationDialog,
            confirmationTitle,
            confirmationAction,
            openImageDialog,
            imageDialogUrl,
        } = this.state;
        const {
            // classes,
            models,
        } = this.props;
        return (
            <div>
                <Hidden xsDown>
                    <MUIDataTable
                        title="Géstion des modèles"
                        data={
                            Object.entries(models).map(([k, v]) =>
                                [
                                    v.id,
                                    <Typography variant="h6" style={{paddingLeft: 16}}>
                                        {v.nom}
                                    </Typography>,
                                    v.code_modele,
                                    v.prix_base,
                                    v.disponible,
                                    v.image ? <Logo alt="logo" src={v.image} onClick={
                                        () => {
                                            this.setState({imageDialogUrl: v.image}, this.toggleImageDialog)
                                        }
                                    }/> : <></>,
                                    <>
                                        <IconButton color="inherit" onClick={
                                            () => {
                                                this.setState({
                                                        formOnSubmit: this.update,
                                                        formInitialValues: {
                                                            id: v.id,
                                                            nom: v.nom,
                                                            code_modele: v.code_modele,
                                                            prix_base: v.prix_base,
                                                        },
                                                        formTitle: `Modifier le Modèle ${v.nom}`,
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
                                                            le modèle ${v.nom} ainsi que toutes ses versions? 
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

                    {/*Add new Item dialog*/}
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

                {/*Image dialog*/}
                {
                    openImageDialog && <ImageDialog
                        open={openImageDialog}
                        image={imageDialogUrl}
                        onClose={this.toggleImageDialog}
                    />
                }
            </div>
        );
    }
}
