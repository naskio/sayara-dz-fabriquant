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
} from "@material-ui/core";
import ImageUploader from '../../../components/dashboard/imageUploader';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../styles/material_ui/forms.style';
import types from '../../../assets/data/imageTypes';
import {secureUrlRegex} from "../../../utils/regex";

const validationSchema = Yup.object({
    titre: Yup.string("Entrez le titre de l'image").required("Ce champs est obligatoire"),
    type: Yup.number("Veuillez choisir le type de l'image").required("Ce champs est obligatoire"),
    modele: Yup.number("Choississez le modèle").required("Ce champs est obligatoire"),
    url: Yup.string("Veuillez choisir une image")
        .matches(secureUrlRegex, "Veuillez entrez un lien valide d'image")
        .required("Ce champs est obligatoire"),
});

class View extends React.Component {
    render() {
        const {classes, onSubmit, initialValues, onCancel, title, models} = this.props;
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                render={props => {
                    const {
                        values: {
                            titre,
                            type,
                            modele,
                            url,
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
                        setFieldError,
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
                                        name="titre"
                                        className={classes.textFieldFull}
                                        placeholder="Titre de l'image"
                                        helperText={touched.titre ? errors.titre : ""}
                                        error={touched.titre && Boolean(errors.titre)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={titre}
                                    />
                                    <TextField
                                        select
                                        margin="normal"
                                        name="type"
                                        className={classes.textField}
                                        placeholder="Le type de l'image"
                                        label="Le type de l'image"
                                        helperText={touched.type ? errors.type : ""}
                                        error={touched.type && Boolean(errors.type)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={type}
                                    >
                                        {
                                            types && Object.entries(types).map(([k, v]) => (
                                                <MenuItem key={k} value={k}>{v.label}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                        select
                                        margin="normal"
                                        name="modele"
                                        className={classes.textField}
                                        placeholder="Le modèle"
                                        label="Le modèle"
                                        helperText={touched.modele ? errors.modele : ""}
                                        error={touched.modele && Boolean(errors.modele)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={modele}
                                    >
                                        {
                                            models && Object.entries(models).map(([k, v]) => (
                                                <MenuItem key={k} value={v.id}>{v.nom}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <ImageUploader
                                        name="url"
                                        setFieldValue={setFieldValue}
                                        setFieldTouched={setFieldTouched}
                                        setFieldError={setFieldError}
                                        value={url}
                                        helperText={touched.url ? errors.url : ""}
                                        error={touched.url && Boolean(errors.url)}
                                        handleBlur={handleBlur}
                                        classes={classes}
                                        handleChange={handleChange}
                                    />
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
