import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {
    Button,
    DialogTitle,
    DialogContent,
    Divider,
    DialogActions,
    TextField,
    MenuItem,
    Select,
    InputLabel,
} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../styles/material_ui/forms.style';

const validationSchema = Yup.object({
    numero_chassis: Yup.string("Entrez le numéro de chassis").required("Ce champs est obligatoire"),
    version: Yup.number("Choississez la version").required("Ce champs est obligatoire"),
    couleur: Yup.number("Choississez la couleur").required("Ce champs est obligatoire"),
    options: Yup.array(
        Yup.string("Choisir une option")
            .required("Ce champs est obligatoire")
    ),
    nom_concessionnaire: Yup.string("Entrez le nom de concessionnaire").required("Ce champs est obligatoire"),
    modele: Yup.number("Choississez le modèle de la vidéo").required("Ce champs est obligatoire"),
});

class View extends React.Component {
    render() {
        const {classes, onSubmit, initialValues, onCancel, title, versions, colors, options_all, models} = this.props;
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                render={props => {
                    const {
                        values: {
                            numero_chassis,
                            version,
                            couleur,
                            options,
                            nom_concessionnaire,
                            modele,
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
                            <DialogTitle
                                className={classes.title}
                            >
                                {title}
                            </DialogTitle>
                            <Divider variant="middle"/>
                            <DialogContent>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        margin="normal"
                                        name="numero_chassis"
                                        className={classes.textField}
                                        placeholder="Numéro de chassis"
                                        helperText={touched.numero_chassis ? errors.numero_chassis : ""}
                                        error={touched.numero_chassis && Boolean(errors.numero_chassis)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={numero_chassis}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="nom_concessionnaire"
                                        className={classes.textField}
                                        placeholder="Nom de concessionnaire"
                                        helperText={touched.nom_concessionnaire ? errors.nom_concessionnaire : ""}
                                        error={touched.nom_concessionnaire && Boolean(errors.nom_concessionnaire)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={nom_concessionnaire}
                                    />
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
                                        className={classes.textFieldFull}
                                        placeholder="La version"
                                        label="La version"
                                        helperText={touched.version ? errors.version : ""}
                                        error={touched.version && Boolean(errors.version)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={version}
                                        disabled={!modele}
                                    >
                                        {
                                            versions && Object.entries(versions)
                                                .filter(([k, v]) => v.modele === modele)
                                                .map(([k, v]) => (
                                                    <MenuItem key={k} value={v.id}>{v.nom}</MenuItem>
                                                ))
                                        }
                                    </TextField>
                                    <TextField
                                        select
                                        margin="normal"
                                        name="couleur"
                                        className={classes.textFieldFull}
                                        placeholder="La couleur"
                                        label="La couleur"
                                        helperText={touched.couleur ? errors.couleur : ""}
                                        error={touched.couleur && Boolean(errors.couleur)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={couleur}
                                        disabled={!modele}
                                    >
                                        {
                                            colors && Object.entries(colors)
                                                .filter(([k, v]) => v.modele === modele)
                                                .map(([k, v]) => (
                                                    <MenuItem key={k} value={v.id}>{v.nom}</MenuItem>
                                                ))
                                        }
                                    </TextField>
                                    <InputLabel style={{marginTop: 16}} htmlFor="options">Les
                                        options</InputLabel>
                                    <Select
                                        multiple
                                        displayEmpty
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={options}
                                        style={{marginBottom: 16}}
                                        placeholder="Les options"
                                        label="Les options"
                                        name="options"
                                        id="options"
                                        className={classes.textFieldFull}
                                        disabled={!modele}
                                        // hintText={touched.options ? errors.options : ""}
                                        // error={touched.options && Boolean(errors.options)}
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
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={onCancel}
                                        color='primary'
                                        variant="text"
                                >
                                    Annuler
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={handleSubmit}
                                    type="submit"
                                    variant="contained"
                                    disabled={!isValid || isSubmitting}
                                >
                                    Enregistrer
                                </Button>
                            </DialogActions>
                        </>
                    );
                }}
            />
        );
    }
}

export default withStyles(styles)(View);
