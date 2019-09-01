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
import Form from './colors.form';
import SnackBar from '../../../components/dashboard/snackbar';
import ConfirmationDialog from "../../../components/dashboard/confirmationDialog";
import Logo from '../../../components/Logo';
import {simpleContrast} from "../../../utils/colors";
import ImageDialog from "../../../components/dashboard/imageDialog";
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
            openImageDialog: false,
            imageDialogUrl: '',
        };
    }

    toggleConfirmationDialog = () => {
        const {openConfirmationDialog} = this.state;
        this.setState({openConfirmationDialog: !openConfirmationDialog});
    };

    toggleDialog = () => {
        const {openDialog} = this.state;
        this.setState({openDialog: !openDialog,});
    };

    toggleImageDialog = () => {
        const {openImageDialog} = this.state;
        this.setState({openImageDialog: !openImageDialog,});
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
        const {createColor} = this.props;
        console.log('REQUEST:', data);
        createColor(data)
            .then(res => {
                this.showSnackBar(`Couleur ${res.nom} a été créé avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    update = data => {
        this.toggleDialog();
        const {updateColor} = this.props;
        console.log('REQUEST:', data);
        updateColor(data)
            .then(res => {
                this.showSnackBar(`Couleur ${res.nom} a été modifié avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    delete = data => {
        this.toggleConfirmationDialog();
        const {deleteColor} = this.props;
        console.log('REQUEST:', data);
        deleteColor(data)
            .then(res => {
                this.showSnackBar(`Couleur ${res.nom} a été supprimé avec succès.`, 'success');
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
            name: 'code_couleur',
            label: 'Code',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'modele',
            label: 'Modèle',
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: 'modele_image',
            label: 'Image de modèle',
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
                noMatch: "Aucune couleur existante.",
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
            <Tooltip title="Ajouter une couleur" aria-label="Ajouter">
                <IconButton
                    onClick={() => {
                        this.setState({
                                formOnSubmit: this.create,
                                formInitialValues: {
                                    nom: '',
                                    code_couleur: '',
                                    modele: '',
                                    modele_image: '',
                                },
                                formTitle: 'Ajouter une Couleur',
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
            openImageDialog,
            imageDialogUrl,
        } = this.state;
        const {
            // classes,
            models,
            colors,
        } = this.props;
        return (
            <div>
                <Hidden xsDown>
                    <MUIDataTable
                        title="Géstion des couleurs"
                        data={
                            !!models && !!colors ? Object.entries(colors).map(([k, v]) =>
                                [
                                    v.id,
                                    <Typography variant="h6" style={{paddingLeft: 16}}>
                                        {v.nom}
                                    </Typography>,
                                    <div style={{
                                        backgroundColor: v.code_couleur,
                                        padding: 8,
                                        borderRadius: 8,
                                        textAlign: 'center',
                                        color: simpleContrast(v.code_couleur),
                                    }}>{v.code_couleur}</div>,
                                    v.modele && models[v.modele] ? models[v.modele].nom : '',
                                    v.modele_image ? <Logo alt="logo"
                                                           src={v.modele_image}
                                                           onClick={
                                                               () => {
                                                                   this.setState({imageDialogUrl: v.modele_image}, this.toggleImageDialog)
                                                               }
                                                           }
                                    /> : <></>,
                                    <>
                                        <IconButton color="inherit" onClick={
                                            () => {
                                                this.setState({
                                                        formOnSubmit: this.update,
                                                        formInitialValues: {
                                                            id: v.id,
                                                            nom: v.nom,
                                                            code_couleur: v.code_couleur,
                                                            modele: v.modele,
                                                            modele_image: v.modele_image,
                                                        },
                                                        formTitle: `Modifier la Couleur ${v.nom}`,
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
                                                            la couleur ${v.nom} ? 
                                                            Cette action est irréversible`,
                                                    },
                                                    this.toggleConfirmationDialog);
                                            }
                                        }>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </>
                                ]
                            ).reverse() : []
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
