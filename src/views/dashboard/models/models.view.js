import React from 'react';
import {
    Tooltip,
    IconButton,
    Hidden,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Divider,
    Button,
    Avatar,
} from '@material-ui/core';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import SnackBar from '../../../components/dashboard/snackbar';


export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: props.models,
            openDialog: false,
            openSnackBar: false,
        };
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     const {models} = this.props;
    //     if (prevProps.models !== models) {
    //         this.setState({data: models});
    //     }
    // }

    // componentDidMount() {
    //     const {createModel, updateModel, deleteModel, fetchModels} = this.props;
    //     createModel({
    //         nom: 'auDD',
    //         code_modele: '93EMPIRE',
    //         prix_base: 100,
    //         // marque: 1,
    //     });
    // }

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
                filter: true,
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
                <IconButton onClick={this.toggleDialog}>
                    <AddIcon/>
                </IconButton>
            </Tooltip>
        ),
        // customToolbarSelect: () => (<></>),
        selectableRows: 'none',
    };

    // componentWillMount() {
    //     const {dispatchFetchUsers, dispatchFetchCache} = this.props;
    //     dispatchFetchCache(() => {
    //         dispatchFetchUsers(() => {
    //         });
    //     });
    // }

    // getDataForTable = () => {
    //     const {users, brands} = this.props;
    //     return _.map(users, item => {
    //         return [
    //             item.nom,
    //             item.prenom,
    //             item.email,
    //             item.n_telephone,
    //             brands[item.marque].nom,
    //             <Hidden smDown>
    //                 <FloatingActionButtons id={item.id}/>
    //             </Hidden>,
    //         ];
    //     });
    // };

    render() {
        const {openDialog, openSnackBar} = this.state;
        const {classes, models} = this.props;
        return (
            <div>
                <Hidden xsDown>
                    <MUIDataTable
                        title="Géstion des modèles"
                        data={
                            Object.entries(models).map(([k, v]) =>
                                [
                                    v.id,
                                    <Typography variant="h6" align="center">
                                        {v.nom}
                                    </Typography>,
                                    v.code_modele,
                                    v.prix_base,
                                    v.disponible,
                                    v.image ? <Avatar alt="logo" src={v.image}/> : <></>,
                                    <>
                                        <IconButton color="inherit">
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton color="inherit">
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
                    onClose={this.toggleDialog} // from parent
                    // aria-labelledby="form-dialog-title"
                >
                    <DialogTitle
                        // id="form-dialog-title"
                        // className={classes.title}
                    >
                        {/*<span style={{color: 'white'}}>{this.getTitle()}</span>*/}
                        Title Here
                    </DialogTitle>

                    <Divider variant="middle"/>
                    <DialogContent>
                        <Typography>Hello From Dialog</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleDialog} bgcolor="primary.main">
                            Annuler
                        </Button>
                        <Button color="primary">
                            Enregistrer
                        </Button>
                    </DialogActions>
                </Dialog>

                {/*message SnackBar*/}
                <SnackBar
                    open={openSnackBar}
                    handleClose={this.handleCloseSnackBar}
                    message='hello world!'
                    variant="info"
                />
            </div>
        );
    }
}
