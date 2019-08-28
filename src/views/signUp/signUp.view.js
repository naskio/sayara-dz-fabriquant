import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import theme from "../../styles/theme";
import {LOGO_WHITE} from "../../assets/images";
import {Link} from "react-router-dom";
import {
    Fab,
    Button,
    TextField,
    InputAdornment,
    Link as UILink,
    Paper,
    CircularProgress,
    Typography
} from "@material-ui/core";
import {ChevronRight, Language, ConfirmationNumber, Home, Email, Phone} from "@material-ui/icons";
import {phoneRegex} from "../../utils/regex";

const Section = styled.section`
  height: 100vh;
`;
const Background = styled.div`
  background: linear-gradient(90deg, ${theme.COLORS.PRIMARY}, ${theme.COLORS.PRIMARY_DARK} 50%);
  height: 100vh;
`;

const WhiteTitle = styled.h1`
    color: #fff;
    font-size: 4rem;
    font-weight: ${theme.FONT_WEIGHT.MEDIUM};
`;

const Logo = styled.img`
  height: 15rem;
  object-fit: contain;
`;

const Title = styled.h2`
    color: ${theme.COLORS.PRIMARY};
    font-size: 3rem;
    font-weight: ${theme.FONT_WEIGHT.MEDIUM};
`;

const SubTitle = styled.p`
    color: ${theme.COLORS.PRIMARY_DARK};
    font-size: 1.5rem;
    font-weight: ${theme.FONT_WEIGHT.MEDIUM};
    text-align: center;
`;

const Description = styled.p`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.SMALL};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
    text-align: center;
`;

const validationSchema = Yup.object({
    denomination_sociale: Yup.string("Entrez le nom de votre entreprise").required("Ce champs est obligatoire"),
    numero_serie: Yup.number("Entrez le numéro de SIREN").required("Ce champs est obligatoire"),
    siege: Yup.string("Entrez l'adresse de siège").required("Ce champs est obligatoire"),
    user_nom: Yup.string("Entrez votre nom").required("Ce champs est obligatoire"),
    user_prenom: Yup.string("Entrez votre prénom").required("Ce champs est obligatoire"),
    user_email: Yup.string("Entrez votre email").email("Entrez un email valide").required("Ce champs est obligatoire"),
    user_phone: Yup.string("Entrez votre téléphone").matches(phoneRegex, "Entrez un téléphone valide").required("Ce champs est obligatoire"),
});

const initialValues = {
    denomination_sociale: '',
    numero_serie: '',
    siege: '',
    user_nom: '',
    user_prenom: '',
    user_email: '',
    user_phone: '',
};


export default class View extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {message: ''};
    }

    render() {
        const {isSignedUp, submit} = this.props;
        const {message} = this.state;
        return <Section className="container-fluid">
            <div className="row">
                <Background className="col d-flex flex-column justify-content-center align-items-center">
                    <div className="col-6">
                        <Logo src={LOGO_WHITE}/>
                        <WhiteTitle className="m-0">Gérez vos stocks, commandes et ventes</WhiteTitle>
                        <div className="mt-5">
                            <Link to='/'>
                                <Fab variant="extended" size="large">
                                    Découvrir Plus
                                    <ChevronRight/>
                                </Fab>
                            </Link>
                        </div>
                    </div>
                </Background>
                <div className="vh-100 col d-flex flex-column justify-content-center align-items-center">
                    <Paper className="d-flex flex-column justify-content-center align-items-center pt-5 pb-5">
                        {
                            isSignedUp ?
                                (<>
                                    <Title className="m-0">Demande envoyé</Title>
                                    <Description className="p-0 m-3"> Votre demande à été bien envoyée,
                                        Veuillez patienter, on va vous contactez
                                        ulterieurement =) </Description>
                                    <SubTitle className="m-3">Merci pour votre confiance</SubTitle>
                                </>)
                                :
                                (<Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(data) => {
                                        submit(data)
                                            .catch((err) => {
                                                this.setState({message: 'Une erreur inconnue est servenue'})
                                            });
                                    }}
                                    render={props => {

                                        const {
                                            values: {
                                                denomination_sociale,
                                                numero_serie,
                                                siege,
                                                user_nom,
                                                user_prenom,
                                                user_email,
                                                user_phone,
                                            },
                                            errors,
                                            touched,
                                            handleSubmit,
                                            handleChange,
                                            handleBlur,
                                            isValid,
                                            // status,
                                            isSubmitting,
                                        } = props;

                                        return (
                                            <form onSubmit={handleSubmit}
                                                  className="d-flex flex-column justify-content-center align-items-center"
                                            >
                                                <Title className="m-0">Demande d'inscription</Title>
                                                <div className="col-10">
                                                    <Description>Veuillez remplir ce formulaire si vous souhaitez
                                                        rejoindre
                                                        notre
                                                        communauté
                                                        de fabriquants, on va vous contactez
                                                        ulterieurement.</Description>
                                                    <SubTitle className="m-0">Information sur l'entreprise</SubTitle>
                                                    <TextField
                                                        id="denomination_sociale"
                                                        name="denomination_sociale"
                                                        placeholder="Dénomination sociale"
                                                        className="mt-3 mb-3"
                                                        fullWidth
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Language/>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        helperText={touched.denomination_sociale ? errors.denomination_sociale : ""}
                                                        error={touched.denomination_sociale && Boolean(errors.denomination_sociale)}
                                                        // onChange={change.bind(null, "denomination_sociale")}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={denomination_sociale}
                                                    />
                                                    <TextField
                                                        id="numero_serie"
                                                        name="numero_serie"
                                                        placeholder="Numéro de SIREN"
                                                        // type="number"
                                                        className="mt-3 mb-3"
                                                        fullWidth
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <ConfirmationNumber/>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        helperText={touched.numero_serie ? errors.numero_serie : ""}
                                                        error={touched.numero_serie && Boolean(errors.numero_serie)}
                                                        // onChange={change.bind(null, "numero_serie")}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={numero_serie}
                                                    />
                                                    <TextField
                                                        id="siege"
                                                        name="siege"
                                                        placeholder="Siège"
                                                        className="mt-3 mb-3"
                                                        fullWidth
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Home/>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        helperText={touched.siege ? errors.siege : ""}
                                                        error={touched.siege && Boolean(errors.siege)}
                                                        // onChange={change.bind(null, "siege")}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={siege}
                                                    />
                                                    <SubTitle className="m-0 mt-3">Information sur le
                                                        représentant</SubTitle>
                                                    <TextField
                                                        id="user_nom"
                                                        name="user_nom"
                                                        placeholder="Nom"
                                                        className="mt-3 mb-3"
                                                        fullWidth
                                                        required
                                                        helperText={touched.user_nom ? errors.user_nom : ""}
                                                        error={touched.user_nom && Boolean(errors.user_nom)}
                                                        // onChange={change.bind(null, "user_nom")}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={user_nom}
                                                    />
                                                    <TextField
                                                        id="user_prenom"
                                                        name="user_prenom"
                                                        placeholder="Prénom"
                                                        fullWidth
                                                        className="mt-3 mb-3"
                                                        required
                                                        helperText={touched.user_prenom ? errors.user_prenom : ""}
                                                        error={touched.user_prenom && Boolean(errors.user_prenom)}
                                                        // onChange={change.bind(null, "user_prenom")}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={user_prenom}
                                                    />
                                                    <TextField
                                                        id="user_email"
                                                        name="user_email"
                                                        placeholder="Email"
                                                        // type="mail"
                                                        className="mt-3 mb-3"
                                                        fullWidth
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Email/>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        helperText={touched.user_email ? errors.user_email : ""}
                                                        error={touched.user_email && Boolean(errors.user_email)}
                                                        // onChange={change.bind(null, "user_email")}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={user_email}
                                                    />
                                                    <TextField
                                                        id="user_phone"
                                                        name="user_phone"
                                                        placeholder="Téléphone"
                                                        // type="tel"
                                                        className="mt-3 mb-3"
                                                        fullWidth
                                                        required
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Phone/>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        helperText={touched.user_phone ? errors.user_phone : ""}
                                                        error={touched.user_phone && Boolean(errors.user_phone)}
                                                        // onChange={change.bind(null, "user_phone")}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={user_phone}
                                                    />
                                                </div>
                                                {
                                                    isSubmitting ? <CircularProgress
                                                            variant="indeterminate"
                                                            color="primary"
                                                            className="mt-3 mb-3"
                                                        /> :
                                                        <Button
                                                            type="submit"
                                                            size="large"
                                                            color="primary"
                                                            variant="contained"
                                                            className="mt-3 mb-3"
                                                            disabled={!isValid}
                                                        >
                                                            ENVOYER LA DEMANDE
                                                        </Button>
                                                }
                                                {
                                                    message && (<Typography align='center' color='error'>
                                                        {message}
                                                    </Typography>)
                                                }
                                            </form>);
                                    }}
                                />)
                        }
                        <UILink component={Link} to='/connexion' color="inherit" className="mt-3 mb-3">
                            Vous avez déjà un compte? Se connecter.
                        </UILink>
                    </Paper>
                </div>
            </div>
        </Section>;
    }
}
