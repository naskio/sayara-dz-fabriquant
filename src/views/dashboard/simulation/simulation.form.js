import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {
    Button,
    TextField,
    MenuItem, InputLabel, Select, Typography,
} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../styles/material_ui/forms.style';
import {simpleContrast} from "../../../utils/colors";

const validationSchema = Yup.object({
    modele: Yup.number("Choississez le modèle").required("Ce champs est obligatoire"),
    version: Yup.number("Choisir la version").required("Ce champs est obligatoire"),
    couleur: Yup.number("Choisir la couleur").required("Ce champs est obligatoire"),
    options: Yup.array(
        Yup.string("Choisir une option")
            .required("Ce champs est obligatoire")
    ),
});

class View extends React.Component {
    render() {
        const {classes, onSubmit, initialValues, onCancel, models, versions, colors, options_all} = this.props;
        return (
            <Formik
                ref={(ref) => this.formik = ref}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                render={props => {
                    const {
                        values: {
                            modele,
                            version,
                            couleur,
                            options,
                        },
                        errors,
                        touched,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        isValid,
                        // status,
                        isSubmitting,
                        setFieldValue,
                        setFieldTouched,
                        // setFieldError,
                    } = props;
                    return (
                        <>
                            <form className='d-flex flex-column' noValidate>
                                <Typography style={{alignSelf: 'center'}} variant="h5" color="primary" className="mb-3 mt-5">Simuler le prix d'un véhicule</Typography>
                                <TextField
                                    select
                                    margin="normal"
                                    name="modele"
                                    className={classes.textFieldFull}
                                    placeholder="Le modèle"
                                    label="Le modèle"
                                    helperText={touched.modele ? errors.modele : ""}
                                    error={touched.modele && Boolean(errors.modele)}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setFieldTouched('version', false, false);
                                        setFieldValue('version', '', false);
                                        setFieldTouched('options', false, false);
                                        setFieldValue('options', [], false);
                                        setFieldTouched('couleur', false, false);
                                        setFieldValue('couleur', '', false);
                                    }}
                                    onBlur={handleBlur}
                                    value={modele}
                                >
                                    {
                                        models && Object.entries(models).map(([k, v]) => (
                                            <MenuItem key={k} value={v.id}>{v.nom}</MenuItem>
                                        ))
                                    }
                                </TextField>
                                <TextField
                                    select
                                    margin="normal"
                                    name="version"
                                    disabled={!modele}
                                    className={classes.textFieldFull}
                                    placeholder="La version"
                                    label="Le version"
                                    helperText={touched.version ? errors.version : ""}
                                    error={touched.version && Boolean(errors.version)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={version}
                                >
                                    {
                                        models && Object.entries(versions)
                                            .filter(([k, v]) => v.modele === modele)
                                            .map(([k, v]) => (
                                                <MenuItem key={k} value={v.id}>{v.nom}</MenuItem>
                                            ))
                                    }
                                </TextField>
                                <TextField
                                    select
                                    margin="normal"
                                    disabled={!modele}
                                    name="couleur"
                                    className={classes.textFieldFull}
                                    placeholder="La couleur"
                                    label="Le couleur"
                                    helperText={touched.couleur ? errors.couleur : ""}
                                    error={touched.couleur && Boolean(errors.couleur)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={couleur}
                                >
                                    {
                                        models && Object.entries(colors)
                                            .filter(([k, v]) => v.modele === modele)
                                            .map(([k, v]) => (
                                                <MenuItem key={k} value={v.id}
                                                          style={{
                                                              backgroundColor: v.code_hexa,
                                                              color: simpleContrast(v.code_hexa),
                                                          }}
                                                >{v.nom}</MenuItem>
                                            ))
                                    }
                                </TextField>

                                <InputLabel style={{marginTop: 16}} htmlFor="options">Les
                                    options</InputLabel>
                                <Select
                                    multiple
                                    displayEmpty
                                    disabled={!modele}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={options}
                                    style={{marginBottom: 16}}
                                    placeholder="Les options"
                                    label="Les options"
                                    name="options"
                                    id="options"
                                    className={classes.textFieldFull}
                                >
                                    {
                                        options_all && Object.entries(options_all)
                                            .filter(([k, v]) => v.modele === modele)
                                            .map(([k, v]) => (
                                                <MenuItem key={k} value={v.id}>{v.nom}</MenuItem>
                                            ))
                                    }
                                </Select>
                            </form>
                            <div className="d-flex flex-row justify-content-end mt-5 mb-5">
                                <Button onClick={() => {
                                    this.formik.resetForm();
                                    onCancel();
                                }}
                                        color='primary'
                                        variant="text"
                                        className="mr-4"
                                >
                                    RESET
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={handleSubmit}
                                    type="submit"
                                    variant="contained"
                                    disabled={!isValid || isSubmitting}
                                >
                                    SIMULER
                                </Button>
                            </div>
                        </>
                    );
                }}
            />
        );
    }
}

export default withStyles(styles)(View);
