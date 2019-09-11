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
import Form from './options.form';
import SnackBar from '../../../components/dashboard/snackbar';
import ConfirmationDialog from "../../../components/dashboard/confirmationDialog";
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
        const {createOption} = this.props;
        console.log('REQUEST:', data);
        createOption(data)
            .then(res => {
                this.showSnackBar(`l'Option ${res.nom} a été créé avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    update = data => {
        this.toggleDialog();
        const {updateOption} = this.props;
        console.log('REQUEST:', data);
        updateOption(data)
            .then(res => {
                this.showSnackBar(`l'Option ${res.nom} a été modifié avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    delete = data => {
        this.toggleConfirmationDialog();
        const {deleteOption} = this.props;
        console.log('REQUEST:', data);
        deleteOption(data)
            .then(res => {
                this.showSnackBar(`l'Option ${res.nom} a été supprimé avec succès.`, 'success');
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
            name: 'code_option',
            label: 'Code',
            options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'category',
            label: 'Catégorie',
            options: {
                filter: true,
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
                noMatch: "Aucune option existante.",
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
            <Tooltip title="Ajouter une option" aria-label="Ajouter">
                <IconButton
                    onClick={() => {
                        this.setState({
                                formOnSubmit: this.create,
                                formInitialValues: {
                                    nom: '',
                                    code_option: '',
                                    category: '',
                                    modele: '',
                                },
                                formTitle: 'Ajouter une Option',
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
            categories,
            options,
        } = this.props;
        return (
            <div>
                <Hidden xsDown>
                    <MUIDataTable
                        title="Gestion des options"
                        data={
                            Object.entries(options).map(([k, v]) =>
                                [
                                    v.id,
                                    <Typography variant="h6" style={{paddingLeft: 16}}>
                                        {v.nom}
                                    </Typography>,
                                    v.code_option,
                                    categories && categories[v.category] ? categories[v.category].nom : '',
                                    models && models[v.modele] ? models[v.modele].nom : '',
                                    <>
                                        <IconButton color="inherit" onClick={
                                            () => {
                                                this.setState({
                                                        formOnSubmit: this.update,
                                                        formInitialValues: {
                                                            id: v.id,
                                                            nom: v.nom,
                                                            code_option: v.code_option,
                                                            category: v.category,
                                                            modele: v.modele,
                                                        },
                                                        formTitle: `Modifier l'Option ${v.nom}`,
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
                                                            l'option ${v.nom} ? 
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
                                categories={categories}
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
