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
    MenuItem, InputLabel, Select, Typography,
    InputAdornment
} from "@material-ui/core";
import ImageUploader from '../../../components/dashboard/imageUploader';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../styles/material_ui/forms.style';
import {secureUrlRegex} from "../../../utils/regex";
import motorTypes from '../../../assets/data/motorTypes';
import freinTypes from '../../../assets/data/freinTypes';
import energieTypes from '../../../assets/data/energieTypes';
import boiteTypes from '../../../assets/data/boiteTypes';

/*eslint-disable no-template-curly-in-string */
const validationSchema = Yup.object({
    nom: Yup.string("Entrez le nom de la version").required("Ce champs est obligatoire"),
    code_version: Yup.string("Entrez le code de la version").required("Ce champs est obligatoire"),
    modele: Yup.number("Choisissez le modèle de la version").required("Ce champs est obligatoire"),
    image: Yup.string("Veuillez choisir une image")
        .matches(secureUrlRegex, "Veuillez entrez un lien valide d'image")
        .required("Ce champs est obligatoire"),
    options: Yup.array(
        Yup.string("Choisir une option")
            .required("Ce champs est obligatoire")
    ),
    // select
    energie: Yup.string("Choisissez le type l'énergie").required("Ce champs est obligatoire"),
    // select
    boite: Yup.string("Choisissez le type la boite").required("Ce champs est obligatoire"),
    // litres
    reservoir: Yup.number("Entrez la capacité de réservoir")
        .min(1, 'doit être supérieur à ${min}')
        .max(200, 'doit être inférieur à ${max}')
        .required("Ce champs est obligatoire"),
    // select
    freins_avant: Yup.string("Choisissez le type de freins avant").required("Ce champs est obligatoire"),
    // select
    freins_arriere: Yup.string("Choisissez le type de freins arrière").required("Ce champs est obligatoire"),
    // select
    type_moteur: Yup.string("Choisissez le type du moteur").required("Ce champs est obligatoire"),
    // cc
    cylindre: Yup.number("Entrez le nombre de cylindres")
        .min(0, 'doit être supérieur à ${min}')
        .max(24, 'doit être inférieur à ${max}')
        .required("Ce champs est obligatoire"),
    // km/h
    vitesse_max: Yup.number("Entrez le vitesse maximale")
        .min(1, 'doit être supérieur à ${min}')
        .max(400, 'doit être inférieur à ${max}')
        .required("Ce champs est obligatoire"),
    // string
    couple: Yup.string("Entrez le couple, exemple: 340 NM - 1750 à 3 000 tr/min nm")
        .required("Ce champs est obligatoire"),
    // number
    nbr_cylindres: Yup.number("Entrez le nombre de cylindres")
        .min(0, 'doit être supérieur à ${min}')
        .max(24, 'doit être inférieur à ${max}')
        .required("Ce champs est obligatoire"),
    // number
    soupapes: Yup.number("Entrez le nombre de soupapes")
        .min(0, 'doit être supérieur à ${min}')
        .max(24, 'doit être inférieur à ${max}')
        .required("Ce champs est obligatoire"),
});
/*eslint-enable no-template-curly-in-string */

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
                            energie,
                            boite,
                            cylindre,
                            nbr_cylindres,
                            type_moteur,
                            couple,
                            vitesse_max,
                            soupapes,
                            reservoir,
                            freins_avant,
                            freins_arriere,
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
                                    {/*Fiche Technique*/}
                                    <div style={{
                                        marginTop: 32,
                                        marginBottom: -16,
                                        width: '100%',
                                        textAlign: 'center',
                                    }}>
                                        <Typography color='primary'>Fiche technique</Typography>
                                    </div>
                                    <TextField
                                        select
                                        margin="normal"
                                        name="type_moteur"
                                        className={classes.textFieldFull}
                                        placeholder="Type du moteur"
                                        label="Type du moteur"
                                        helperText={touched.type_moteur ? errors.type_moteur : ""}
                                        error={touched.type_moteur && Boolean(errors.type_moteur)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={type_moteur}
                                    >
                                        {
                                            motorTypes.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                        select
                                        margin="normal"
                                        name="energie"
                                        className={classes.textField}
                                        placeholder="Energie"
                                        label="Energie"
                                        helperText={touched.energie ? errors.energie : ""}
                                        error={touched.energie && Boolean(errors.energie)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={energie}
                                    >
                                        {
                                            energieTypes.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </TextField>

                                    <TextField
                                        select
                                        margin="normal"
                                        name="boite"
                                        className={classes.textField}
                                        placeholder="Boîte de vitesse"
                                        label="Boîte de vitesse"
                                        helperText={touched.boite ? errors.boite : ""}
                                        error={touched.boite && Boolean(errors.boite)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={boite}
                                    >
                                        {
                                            boiteTypes.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                        margin="normal"
                                        name="cylindre"
                                        className={classes.textField}
                                        type='number'
                                        placeholder="Cylindrée"
                                        helperText={touched.cylindre ? errors.cylindre : ""}
                                        error={touched.cylindre && Boolean(errors.cylindre)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={cylindre}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">cc</InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="nbr_cylindres"
                                        className={classes.textField}
                                        type='number'
                                        placeholder="Nombre de cylindres"
                                        helperText={touched.nbr_cylindres ? errors.nbr_cylindres : ""}
                                        error={touched.nbr_cylindres && Boolean(errors.nbr_cylindres)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={nbr_cylindres}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="couple"
                                        className={classes.textField}
                                        placeholder="Couple (135 Nm - 3000 tr/min nm)"
                                        helperText={touched.couple ? errors.couple : ""}
                                        error={touched.couple && Boolean(errors.couple)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={couple}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="vitesse_max"
                                        type='number'
                                        className={classes.textField}
                                        placeholder="Vitesse maximale"
                                        helperText={touched.vitesse_max ? errors.vitesse_max : ""}
                                        error={touched.vitesse_max && Boolean(errors.vitesse_max)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={vitesse_max}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">km/h</InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="soupapes"
                                        type='number'
                                        className={classes.textField}
                                        placeholder="Nombre de soupapes"
                                        helperText={touched.soupapes ? errors.soupapes : ""}
                                        error={touched.soupapes && Boolean(errors.soupapes)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={soupapes}
                                    />
                                    <TextField
                                        margin="normal"
                                        name="reservoir"
                                        type='number'
                                        className={classes.textField}
                                        placeholder="Capacité de réservoir"
                                        helperText={touched.reservoir ? errors.reservoir : ""}
                                        error={touched.reservoir && Boolean(errors.reservoir)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={reservoir}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">litres</InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        select
                                        margin="normal"
                                        name="freins_avant"
                                        className={classes.textField}
                                        placeholder="Freins avant"
                                        label="Freins avant"
                                        helperText={touched.freins_avant ? errors.freins_avant : ""}
                                        error={touched.freins_avant && Boolean(errors.freins_avant)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={freins_avant}
                                    >
                                        {
                                            freinTypes.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <TextField
                                        select
                                        margin="normal"
                                        name="freins_arriere"
                                        className={classes.textField}
                                        placeholder="Freins arrière"
                                        label="Freins arrière"
                                        helperText={touched.freins_arriere ? errors.freins_arriere : ""}
                                        error={touched.freins_arriere && Boolean(errors.freins_arriere)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={freins_arriere}
                                    >
                                        {
                                            freinTypes.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </TextField>

                                    {/*Image*/}
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
