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
    List as ListIcon,
    DescriptionOutlined as SpecsIcon
} from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import Form from './versions.form';
import SnackBar from '../../../components/dashboard/snackbar';
import ConfirmationDialog from "../../../components/dashboard/confirmationDialog";
import Logo from '../../../components/logo';
import ImageDialog from "../../../components/dashboard/imageDialog";
import {catcher} from "../../../utils/catcher";
import OptionsList from "../../../components/list";
import SpecsView from "../../../components/dashboard/ficheTechnique";
import {dataReverseTransformer, dataTransformer} from "../../../assets/data/specs";

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

    transformData = data => (Object.entries(data).reduce((total, [key, value]) => {
        total[key] = dataTransformer(key, value);
        return total;
    }, {}));

    create = data => {
        this.toggleDialog();
        const {createVersion} = this.props;
        console.log('REQUEST:', data);
        createVersion(this.transformData(data))
            .then(res => {
                this.showSnackBar(`Version ${res.nom} a été créé avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    update = data => {
        this.toggleDialog();
        const {updateVersion} = this.props;
        console.log('REQUEST:', data);
        updateVersion(this.transformData(data))
            .then(res => {
                this.showSnackBar(`Version ${res.nom} a été modifié avec succès.`, 'success');
            })
            .catch(catcher(this.showSnackBar));
    };

    delete = data => {
        this.toggleConfirmationDialog();
        const {deleteVersion} = this.props;
        console.log('REQUEST:', data);
        deleteVersion(data)
            .then(res => {
                this.showSnackBar(`Version ${res.nom} a été supprimé avec succès.`, 'success');
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
            name: 'code_version',
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
            name: 'characteristics',
            label: 'Fiche Technique',
            options: {
                filter: false,
                sort: false,
                print: false,
                download: false,
            },
        },
        {
            name: 'options',
            label: 'Options',
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
                noMatch: "Aucune version existante.",
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
            <Tooltip title="Ajouter une version" aria-label="Ajouter">
                <IconButton
                    onClick={() => {
                        this.setState({
                                formOnSubmit: this.create,
                                formInitialValues: {
                                    nom: '',
                                    code_version: '',
                                    modele: '',
                                    image: '',
                                    options: [],
                                    energie: '',
                                    boite: '',
                                    reservoir: '',
                                    freins_avant: '',
                                    freins_arriere: '',
                                    type_moteur: '',
                                    cylindre: '',
                                    vitesse_max: '',
                                    couple: '',
                                    nbr_cylindres: '',
                                    soupapes: '',
                                },
                                formTitle: 'Ajouter une Version',
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
            versions,
            options,
        } = this.props;
        return (
            <div>
                <Hidden xsDown>
                    <MUIDataTable
                        title="Géstion des versions"
                        data={
                            Object.entries(versions).map(([k, v]) =>
                                [
                                    v.id,
                                    <Typography variant="h6" style={{paddingLeft: 16}}>
                                        {v.nom}
                                    </Typography>,
                                    v.code_version,
                                    !!models && !!models[v.modele] ? models[v.modele].nom : '',
                                    v.disponible,
                                    v.image ? <Logo alt="logo" src={v.image} onClick={
                                        () => {
                                            this.setState({imageDialogUrl: v.image}, this.toggleImageDialog)
                                        }
                                    }/> : <></>,
                                    <SpecsView icon={SpecsIcon} id={v.id} specs={v.specifications}/>,
                                    <OptionsList icon={ListIcon} id={v.id}
                                                 list={v.option}
                                                 field='nom'/>,
                                    <>
                                        <IconButton color="inherit" onClick={
                                            () => {
                                                this.setState({
                                                        formOnSubmit: this.update,
                                                        formInitialValues: {
                                                            id: v.id,
                                                            nom: v.nom,
                                                            code_version: v.code_version,
                                                            modele: v.modele,
                                                            image: v.image,
                                                            options: v.option
                                                                .filter(item => !!item.valeur)
                                                                .map(item => item.id),
                                                            energie: v.specifications.moteur.energie,
                                                            boite: v.specifications.moteur.boite,
                                                            reservoir: dataReverseTransformer('reservoir', v.specifications.vehicule.reservoir),
                                                            cylindre: dataReverseTransformer('cylindre', v.specifications.moteur.cylindre),
                                                            vitesse_max: dataReverseTransformer('vitesse_max', v.specifications.moteur.vitesse_max),
                                                            freins_avant: v.specifications.securite.freins_avant,
                                                            freins_arriere: v.specifications.securite.freins_arriere,
                                                            type_moteur: v.specifications.moteur.type_moteur,
                                                            couple: v.specifications.moteur.couple,
                                                            nbr_cylindres: v.specifications.moteur.nbr_cylindres,
                                                            soupapes: v.specifications.moteur.soupapes,
                                                        },
                                                        formTitle: `Modifier la Version ${v.nom}`,
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
                                                            la version ${v.nom} ? 
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
                                options_all={options}
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
