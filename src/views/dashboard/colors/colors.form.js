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
import {colorRegex, secureUrlRegex} from "../../../utils/regex";
import {SketchPicker} from 'react-color';

const validationSchema = Yup.object({
    nom: Yup.string("Entrez le nom de la couleur").required("Ce champs est obligatoire"),
    code_couleur: Yup.string("Entrez la référence de la couleur").required("Ce champs est obligatoire"),
    code_hexa: Yup.string("Entrez la couleur (format Hexadécimal)").matches(colorRegex, 'Veuillez entrez un code hex de couleur').required("Ce champs est obligatoire"),
    modele: Yup.number("Choississez le modèle de la couleur").required("Ce champs est obligatoire"),
    modele_image: Yup.string("Veuillez choisir une image")
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
                            nom,
                            code_couleur,
                            code_hexa,
                            modele,
                            modele_image,
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
                                        name="nom"
                                        className={classes.textFieldFull}
                                        placeholder="Nom de la couleur"
                                        helperText={touched.nom ? errors.nom : ""}
                                        error={touched.nom && Boolean(errors.nom)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={nom}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="code_couleur"
                                        className={classes.textFieldFull}
                                        placeholder="Code (Référence)"
                                        helperText={touched.code_couleur ? errors.code_couleur : ""}
                                        error={touched.code_couleur && Boolean(errors.code_couleur)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={code_couleur}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="code_hexa"
                                        className={classes.textFieldFull}
                                        placeholder="La Couleur (Hexa)"
                                        helperText={touched.code_hexa ? errors.code_hexa : ""}
                                        error={touched.code_hexa && Boolean(errors.code_hexa)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={code_hexa}
                                    />
                                    <SketchPicker
                                        color={code_hexa}
                                        onChangeComplete={(color) => setFieldValue('code_hexa', color.hex)}
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
                                    <ImageUploader
                                        name="modele_image"
                                        label='Image du modèle'
                                        setFieldValue={setFieldValue}
                                        setFieldTouched={setFieldTouched}
                                        setFieldError={setFieldError}
                                        value={modele_image}
                                        helperText={touched.modele_image ? errors.modele_image : ""}
                                        error={touched.modele_image && Boolean(errors.modele_image)}
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
