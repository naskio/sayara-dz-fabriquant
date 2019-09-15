import React from 'react';
import {
    Button,
    Grid,
    // Tooltip,
    // IconButton,
    Hidden,
    // Dialog,
    Paper,
    Stepper,
    Step,
    StepLabel, Typography,
    // Typography,
} from '@material-ui/core';
// import {
//     Add as AddIcon,
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     CloudUploadSharp as CloudIcon,
// } from '@material-ui/icons';
import Form from './simulation.form';
import SnackBar from '../../../components/dashboard/snackbar';
import {catcher} from "../../../utils/catcher";
import {labelTransformer} from "../../../assets/data/specs";
import {simpleContrast} from "../../../utils/colors";


// TODO: build price estimator
export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSnackBar: false,
            messageSnackBar: '',
            variantSnackBar: 'info',
            showResult: false,
            price: '',
            available: '',
            version: '',
            model: '',
            options: [],
            color: '',
            // showResult: true,
            // price: 12331,
            // available: false,
            // version: 48,
            // model: 6,
            // options: [14],
            // color: 20,
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

    simulate = (data) => {
        const {simulate} = this.props;
        simulate(data)
            .then(res => {
                this.setState({
                    showResult: true,
                    price: res.prix,
                    available: res.exist,
                    version: data.version,
                    model: data.modele,
                    options: data.options,
                    color: data.couleur,
                }, () => {
                    console.log('STATE', this.state);
                });
            })
            .catch(catcher(this.showSnackBar));
    };

    reset = () => {
        this.setState({
            showResult: false,
            price: '',
            available: '',
            version: '',
            model: '',
            options: [],
            color: '',
        })
    };

    emptyObject = obj => JSON.stringify(obj) === '{}';

    render() {
        const {
            openSnackBar,
            messageSnackBar,
            variantSnackBar,
            showResult,
            price,
            available,
            version,
            model,
            options,
            color,
        } = this.state;
        const {
            versions,
            models,
            colors,
        } = this.props;
        const options_all = this.props.options;
        return (
            <div className="mt-2 d-flex flex-column align-items-center">
                <Hidden xsDown>
                    {
                        showResult ?
                            (<Paper style={{width: 720}}>
                                {
                                    versions[version].image &&
                                    <img alt='version' src={versions[version].image}
                                         style={{
                                             objectFit: 'cover',
                                             width: '100%',
                                         }}/>
                                }
                                <div style={{margin: 16}}>
                                    <Typography variant="h5" style={{marginBottom: 8,}}>
                                        {models[model].nom} - {versions[version].nom}
                                    </Typography>
                                    <Typography color="secondary" variant="h6" style={{
                                        display: 'inline',
                                    }}>
                                        PRIX {price} DZD
                                    </Typography>
                                    <Typography variant="h6"
                                                style={{
                                                    marginLeft: 16,
                                                    padding: 6,
                                                    display: 'inline',
                                                    borderRadius: 6,
                                                    color: '#fff',
                                                    backgroundColor: available ? '#0ab500' : '#dc0000',
                                                }}>
                                        {available ? 'Disponbile' : 'Non Disponible'}
                                    </Typography>
                                </div>
                                <div className="row pr-3 pl-3">
                                    <div className="col">
                                        <Typography color='primary' variant="button">
                                            Moteur
                                        </Typography>
                                        <div style={{marginLeft: 16,}}>
                                            {
                                                Object.entries(versions[version].specifications.moteur).filter(([spec, value]) => !!value).map(([spec, value]) =>
                                                    (
                                                        <div key={spec}>
                                                            <Typography variant="button"
                                                                        style={{
                                                                            display: "inline",
                                                                        }}>
                                                                {labelTransformer(spec)}
                                                            </Typography>
                                                            <Typography variant="body1"
                                                                        style={{
                                                                            display: "inline",
                                                                            marginLeft: 12,
                                                                        }}>
                                                                {value}
                                                            </Typography>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <Typography color='primary' variant="button">
                                            Véhicule
                                        </Typography>
                                        <div style={{marginLeft: 16, marginBottom: 16,}}>
                                            {
                                                Object.entries(versions[version].specifications.vehicule).filter(([spec, value]) => !!value).map(([spec, value]) =>
                                                    (
                                                        <div key={spec}>
                                                            <Typography variant="button"
                                                                        style={{
                                                                            display: "inline",
                                                                        }}>
                                                                {labelTransformer(spec)}
                                                            </Typography>
                                                            <Typography variant="body1"
                                                                        style={{
                                                                            display: "inline",
                                                                            marginLeft: 12,
                                                                        }}>
                                                                {value}
                                                            </Typography>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                        <Typography color='primary' variant="button">
                                            Sécurité
                                        </Typography>
                                        <div style={{marginLeft: 16,}}>
                                            {
                                                Object.entries(versions[version].specifications.securite).filter(([spec, value]) => !!value).map(([spec, value]) =>
                                                    (
                                                        <div key={spec}>
                                                            <Typography variant="button"
                                                                        style={{
                                                                            display: "inline",
                                                                        }}>
                                                                {labelTransformer(spec)}
                                                            </Typography>
                                                            <Typography variant="body1"
                                                                        style={{
                                                                            display: "inline",
                                                                            marginLeft: 12,
                                                                        }}>
                                                                {value}
                                                            </Typography>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <Typography color='primary' variant="button">
                                            Options
                                        </Typography>
                                        <div style={{marginLeft: 16, marginBottom: 16,}}>
                                            {
                                                options.map(id =>
                                                    <div key={id}>
                                                        <Typography variant="button">
                                                            {options_all[id].nom}
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
                                                            color: simpleContrast(colors[color].code_hexa),
                                                            backgroundColor: colors[color].code_hexa,
                                                        }}>
                                                {colors[color].nom}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row justify-content-end mb-3 mt-2 mr-3">
                                    <Button onClick={this.reset}
                                            color='primary'
                                            variant="contained"
                                    >
                                        NOUVELLE SIMULATION
                                    </Button>
                                </div>
                            </Paper>)
                            :
                            (<Paper className="p-5 m-5 d-flex flex-column align-items-center">
                                {/*<Stepper*/}
                                {/*    activeStep={[!!model, !!version, !!color, !!options].reduce((total, now) => {*/}
                                {/*        return (total + (now ? 1 : 0));*/}
                                {/*    }, 2)}*/}
                                {/*    alternativeLabel>*/}
                                {/*    {['Le modèle', 'La version', 'La couleur', 'Les options']*/}
                                {/*        .map(label => (*/}
                                {/*            <Step key={label}>*/}
                                {/*                <StepLabel>{label}</StepLabel>*/}
                                {/*            </Step>*/}
                                {/*        ))}*/}
                                {/*</Stepper>*/}
                                <Form
                                    onSubmit={this.simulate}
                                    onCancel={this.reset}
                                    initialValues={{
                                        modele: model,
                                        version: version,
                                        couleur: color,
                                        options: options,
                                    }}
                                    versions={versions}
                                    colors={colors}
                                    options_all={options_all}
                                    models={models}
                                />
                            </Paper>)
                    }
                </Hidden>
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
