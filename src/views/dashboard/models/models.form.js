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
} from "@material-ui/core";
// import ImageUploader from '../../../components/dashboard/imageUploader';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../styles/material_ui/forms.style';

const validationSchema = Yup.object({
    // id: Yup.number(),
    nom: Yup.string("Entrez le nom de modèle").required("Ce champs est obligatoire"),
    code_modele: Yup.string("Entrez le code de modèle").required("Ce champs est obligatoire"),
    prix_base: Yup.number("Entrez le prix de base de modèle").required("Ce champs est obligatoire"),
    // image: Yup.string("Veuillez choisir une image").required("Ce champs est obligatoire"),
});

class View extends React.Component {
    render() {
        const {classes, onSubmit, initialValues, onCancel, title} = this.props;
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                render={props => {
                    const {
                        values: {
                            nom,
                            code_modele,
                            prix_base,
                            // image,
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
                                        name="nom"
                                        className={classes.textField}
                                        placeholder="Nom de modèle"
                                        helperText={touched.nom ? errors.nom : ""}
                                        error={touched.nom && Boolean(errors.nom)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={nom}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="code_modele"
                                        className={classes.textField}
                                        placeholder="Code de modèle"
                                        helperText={touched.code_modele ? errors.code_modele : ""}
                                        error={touched.code_modele && Boolean(errors.code_modele)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={code_modele}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="prix_base"
                                        type="number"
                                        className={classes.textFieldFull}
                                        placeholder="Prix de base (DZD)"
                                        helperText={touched.prix_base ? errors.prix_base : ""}
                                        error={touched.prix_base && Boolean(errors.prix_base)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={prix_base}
                                    />
                                    {/*<ImageUploader*/}
                                    {/*    name="image"*/}
                                    {/*    setFieldValue={setFieldValue}*/}
                                    {/*    setFieldTouched={setFieldTouched}*/}
                                    {/*    setFieldError={setFieldError}*/}
                                    {/*    value={image}*/}
                                    {/*    helperText={touched.image ? errors.image : ""}*/}
                                    {/*    error={touched.image && Boolean(errors.image)}*/}
                                    {/*/>*/}
                                </form>
                            </DialogContent>
                            <DialogActions>
                                {/*{*/}
                                {/*    isSubmitting ?*/}
                                {/*        <CircularProgress*/}
                                {/*            variant="indeterminate"*/}
                                {/*            color="primary"*/}
                                {/*        /> :*/}
                                {/*        <>*/}
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
                                {/*        </>*/}
                                {/*}*/}
                            </DialogActions>
                        </>
                    );
                }}
            />
        );
    }
}

export default withStyles(styles)(View);
