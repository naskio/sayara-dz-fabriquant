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
import types from '../../../assets/data/pricingTypes';

// const yesterday = new Date();
// yesterday.setHours(yesterday.getHours() - 24);
// TODO: add modele and filter according to the model
const validationSchema = Yup.object({
    prix: Yup.number("Entrer le montant (DZD)").required("Ce champs est obligatoire"),
    type: Yup.number("Choisir le type de tarification").required("Ce champs est obligatoire"),
    object_id: Yup.number("Choisir le tarif").required("Ce champs est obligatoire"),
    date_debut: Yup.date("Entrer la date du début")
    // .min(yesterday, "Veuillez entrer une date future")
        .required("Ce champs est obligatoire"),
    date_fin: Yup.date("Entrer la date du fin")
        .when('date_debut', (startDate, schema) => (startDate && schema.min(startDate, "veuillez entrez un intervalle valide")),
        ).required("Ce champs est obligatoire"),
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
                            prix,
                            type,
                            object_id,
                            date_debut,
                            date_fin,
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

                    // console.log('debut', date_debut);
                    // console.log('fin', date_fin);

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
                                        name="prix"
                                        type="number"
                                        className={classes.textFieldFull}
                                        label='Montant (DZD)'
                                        placeholder="Montant (DZD)"
                                        helperText={touched.prix ? errors.prix : ""}
                                        error={touched.prix && Boolean(errors.prix)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={prix}
                                    />

                                    <TextField
                                        select
                                        margin="normal"
                                        name="type"
                                        className={classes.textFieldFull}
                                        placeholder="Type de tarification"
                                        label="Type de tarification"
                                        helperText={touched.type ? errors.type : ""}
                                        error={touched.type && Boolean(errors.type)}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setFieldTouched('object_id', false, false);
                                            setFieldValue('object_id', '', false);
                                        }}
                                        onBlur={handleBlur}
                                        value={type}
                                    >
                                        {
                                            Object.entries(types).map(([k, v]) => (
                                                <MenuItem key={k} value={k}>{v.label}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    {
                                        (type === 0 || !!type) && (
                                            <TextField
                                                select
                                                margin="normal"
                                                name='object_id'
                                                className={classes.textFieldFull}
                                                placeholder={`Choisir ${types[type].label}`}
                                                label={`Choisir ${types[type].label}`}
                                                helperText={touched.object_id ? errors.object_id : ""}
                                                error={touched.object_id && Boolean(errors.object_id)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={this.props[types[type].collection] && object_id ? object_id : ''}
                                            >
                                                {
                                                    !!this.props[types[type].collection] && Object.entries(this.props[types[type].collection]).map(([k, v]) => (
                                                        <MenuItem key={k} value={v.id}>{v.nom}</MenuItem>
                                                    ))
                                                }
                                            </TextField>
                                        )
                                    }
                                    <TextField
                                        margin="normal"
                                        name="date_debut"
                                        type="date"
                                        className={classes.textFieldFull}
                                        label={date_debut ? 'Date Debut' : ''}
                                        placeholder="Date Debut"
                                        helperText={touched.date_debut ? errors.date_debut : ""}
                                        error={touched.date_debut && Boolean(errors.date_debut)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={date_debut}
                                    />
                                    {
                                        date_debut && (
                                            <TextField
                                                margin="normal"
                                                name="date_fin"
                                                type="date"
                                                className={classes.textFieldFull}
                                                label={date_fin ? 'Date Fin' : ''}
                                                placeholder="Date Fin"
                                                helperText={touched.date_fin ? errors.date_fin : ""}
                                                error={touched.date_fin && Boolean(errors.date_fin)}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={date_fin}
                                            />
                                        )
                                    }
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
