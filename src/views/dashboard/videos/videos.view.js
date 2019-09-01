import React from 'react';
import {
    Tooltip,
    IconButton,
    Hidden,
    Dialog,
    Typography,
    Link,
} from '@material-ui/core';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import Form from './videos.form';
import SnackBar from '../../../components/dashboard/snackbar';
import ConfirmationDialog from "../../../components/dashboard/confirmationDialog";

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
        const {createVideo} = this.props;
        console.log('REQUEST:', data);
        createVideo(data)
            .then(res => {
                this.showSnackBar(`Vidéo ${res.titre} a été créé avec succès.`, 'success');
            })
            .catch(() => {
                this.showSnackBar('Une erreur inconnue est servenue (Server Error).', 'error');
            });
    };

    update = data => {
        this.toggleDialog();
        const {updateVideo} = this.props;
        console.log('REQUEST:', data);
        updateVideo(data)
            .then(res => {
                this.showSnackBar(`Video ${res.titre} a été modifié avec succès.`, 'success');
            })
            .catch(() => {
                this.showSnackBar('Une erreur inconnue est servenue (Server Error).', 'error');
            });
    };

    delete = data => {
        this.toggleConfirmationDialog();
        const {deleteVideo} = this.props;
        console.log('REQUEST:', data);
        deleteVideo(data)
            .then(res => {
                this.showSnackBar(`Vidéo ${res.titre} a été supprimé avec succès.`, 'success');
            })
            .catch(() => {
                this.showSnackBar('Une erreur inconnue est servenue (Server Error).', 'error');
            });
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
            name: 'titre',
            label: 'Titre',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'url',
            label: 'Lien YouTube',
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
                noMatch: "Aucune vidéo existante.",
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
            <Tooltip title="Ajouter une vidéo" aria-label="Ajouter">
                <IconButton
                    onClick={() => {
                        this.setState({
                                formOnSubmit: this.create,
                                formInitialValues: {
                                    titre: '',
                                    url: '',
                                    modele: '',
                                },
                                formTitle: 'Ajouter une Vidéo',
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
        } = this.state;
        const {
            // classes,
            models,
            videos,
        } = this.props;
        return (
            <div>
                <Hidden xsDown>
                    <MUIDataTable
                        title="Géstion des vidéos"
                        data={
                            Object.entries(videos).map(([k, v]) =>
                                [
                                    v.id,
                                    <Typography variant="h6" style={{paddingLeft: 16}}>
                                        {v.titre}
                                    </Typography>,
                                    <Link href={v.url} target='_blank' rel="noopener noreferrer">Lien YouTube</Link>,
                                    !!models[v.modele] ? models[v.modele].nom : '',
                                    <>
                                        <IconButton color="inherit" onClick={
                                            () => {
                                                this.setState({
                                                        formOnSubmit: this.update,
                                                        formInitialValues: {
                                                            id: v.id,
                                                            titre: v.titre,
                                                            url: v.url,
                                                            modele: v.modele,
                                                        },
                                                        formTitle: `Modifier la Video ${v.titre}`,
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
                                                            la vidéo ${v.titre} ? 
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
