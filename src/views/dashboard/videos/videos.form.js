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
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../styles/material_ui/forms.style';
import {youtubeRegex} from "../../../utils/regex";

const validationSchema = Yup.object({
    titre: Yup.string("Entrez le titre de la vidéo").required("Ce champs est obligatoire"),
    url: Yup.string("Entrez le lien Youtube de la vidéo")
        .matches(youtubeRegex, 'Entrez un lien youtube valide')
        .required("Ce champs est obligatoire"),
    modele: Yup.number("Choississez le modèle de la vidéo").required("Ce champs est obligatoire"),
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
                            url,
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
                        // setFieldValue,
                        // setFieldTouched,
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
                                        name="titre"
                                        className={classes.textField}
                                        placeholder="Titre de la vidéo"
                                        helperText={touched.titre ? errors.titre : ""}
                                        error={touched.titre && Boolean(errors.titre)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={titre}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="url"
                                        className={classes.textField}
                                        placeholder="Lien Youtube"
                                        helperText={touched.url ? errors.url : ""}
                                        error={touched.url && Boolean(errors.url)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={url}
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
