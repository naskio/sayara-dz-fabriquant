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

const validationSchema = Yup.object({
    nom: Yup.string("Entrez le nom de la version").required("Ce champs est obligatoire"),
    code_option: Yup.string("Entrez le code de l'option").required("Ce champs est obligatoire"),
    category: Yup.number("Choississez la catégorie de l'option").required("Ce champs est obligatoire"),
    modele: Yup.number("Choississez le modèle de l'option").required("Ce champs est obligatoire"),
});

class View extends React.Component {
    render() {
        const {classes, onSubmit, initialValues, onCancel, title, models, categories} = this.props;
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                render={props => {
                    const {
                        values: {
                            nom,
                            code_option,
                            category,
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
                                        name="nom"
                                        className={classes.textField}
                                        placeholder="Nom de l'option"
                                        helperText={touched.nom ? errors.nom : ""}
                                        error={touched.nom && Boolean(errors.nom)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={nom}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="code_option"
                                        className={classes.textField}
                                        placeholder="Code de l'option"
                                        helperText={touched.code_option ? errors.code_option : ""}
                                        error={touched.code_option && Boolean(errors.code_option)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={code_option}
                                    />
                                    <TextField
                                        select
                                        margin="normal"
                                        name="category"
                                        className={classes.textFieldFull}
                                        placeholder="La catégorie"
                                        label="La catégorie"
                                        helperText={touched.category ? errors.category : ""}
                                        error={touched.category && Boolean(errors.category)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={category}
                                    >
                                        {
                                            categories && Object.entries(categories).map(([k, v]) => (
                                                <MenuItem key={k} value={v.id}>{v.nom}</MenuItem>
                                            ))
                                        }
                                    </TextField>
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
