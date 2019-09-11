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
    MenuItem, InputLabel, Select,
} from "@material-ui/core";
import ImageUploader from '../../../components/dashboard/imageUploader';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../styles/material_ui/forms.style';
import {secureUrlRegex} from "../../../utils/regex";

const validationSchema = Yup.object({
    nom: Yup.string("Entrez le nom de la version").required("Ce champs est obligatoire"),
    code_version: Yup.string("Entrez le code de la version").required("Ce champs est obligatoire"),
    modele: Yup.number("Choississez le modèle de la version").required("Ce champs est obligatoire"),
    image: Yup.string("Veuillez choisir une image")
        .matches(secureUrlRegex, "Veuillez entrez un lien valide d'image")
        .required("Ce champs est obligatoire"),
    options: Yup.array(
        Yup.string("Choisir une option")
            .required("Ce champs est obligatoire")
    ),
});

class View extends React.Component {
    render() {
        const {classes, onSubmit, initialValues, onCancel, title, models, options_all} = this.props;
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                render={props => {
                    const {
                        values: {
                            nom,
                            code_version,
                            modele,
                            image,
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
                                        className={classes.textField}
                                        placeholder="Nom de Version"
                                        helperText={touched.nom ? errors.nom : ""}
                                        error={touched.nom && Boolean(errors.nom)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={nom}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="code_version"
                                        className={classes.textField}
                                        placeholder="Code de Version"
                                        helperText={touched.code_version ? errors.code_version : ""}
                                        error={touched.code_version && Boolean(errors.code_version)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={code_version}
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
                                            setFieldTouched('options', false, false);
                                            setFieldValue('options', [], false);
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
                                    {
                                        modele && (
                                            <>
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
                                                >
                                                    {
                                                        options_all && Object.entries(options_all)
                                                            .filter(([k, v]) => v.modele === modele)
                                                            .map(([k, v]) => (
                                                                <MenuItem key={k} value={v.id}>{v.nom}</MenuItem>
                                                            ))
                                                    }
                                                </Select>
                                            </>
                                        )
                                    }
                                    <ImageUploader
                                        name="image"
                                        setFieldValue={setFieldValue}
                                        setFieldTouched={setFieldTouched}
                                        setFieldError={setFieldError}
                                        value={image}
                                        helperText={touched.image ? errors.image : ""}
                                        error={touched.image && Boolean(errors.image)}
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
