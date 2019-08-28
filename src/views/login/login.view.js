import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import theme from "../../styles/theme";
import {LOGO} from "../../assets/images";
import {Link} from "react-router-dom";
import {
    Button,
    TextField,
    InputAdornment,
    Link as UILink,
    Paper,
    CircularProgress,
    Typography,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import { Email, Lock} from "@material-ui/icons";


const Section = styled.section`
  height: 100vh;
`;

const Logo = styled.img`
  height: 8rem;
  object-fit: contain;
`;

const Title = styled.h2`
    color: ${theme.COLORS.PRIMARY};
    font-size: 3rem;
    font-weight: ${theme.FONT_WEIGHT.MEDIUM};
`;


const Description = styled.p`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.SMALL};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
    text-align: center;
`;

const validationSchema = Yup.object({
    username: Yup.string("Entrez votre email").email("Entrez un email valide").required("Ce champs est obligatoire"),
    password: Yup.string("Entrez votre mot de passe").required("Ce champs est obligatoire"),
    remember_me: Yup.bool("Se souvenez de moi"),
});

const initialValues = {
    username: '',
    password: '',
    remember_me: false,
};


export default class View extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {message: ''};
    }

    render() {
        const {submit} = this.props;
        const {message} = this.state;
        return <Section className="container-fluid d-flex flex-column justify-content-center align-items-center">
            <Paper className="col-10 col-md-8 col-lg-6 col-xl-4 p-5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(data, {setSubmitting}) => {
                        this.setState({message: ''});
                        submit(data).catch((err) => {
                            if (err && err.response) {
                                const {status} = err.response;
                                if (status === 400) {
                                    this.setState({message: 'Mot de passe incorrecte'});
                                } else {
                                    this.setState({message: 'Erreur inconnue (Server Error)'});
                                }
                            }
                        }).finally(() => setSubmitting(false));
                    }}
                    render={props => {

                        const {
                            values: {
                                username,
                                password,
                                remember_me,
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
                                <Title className="m-0">Se connecter</Title>
                                <Link to='/'>
                                    <Logo src={LOGO}/>
                                </Link>
                                <Description>Bienvenue sur votre tableau de bord.</Description>
                                <TextField
                                    id="username"
                                    name="username"
                                    placeholder="Votre email"
                                    className="mt-3 mb-3"
                                    fullWidth
                                    required
                                    autoComplete="email"
                                    autoFocus
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText={touched.username ? errors.username : ""}
                                    error={touched.username && Boolean(errors.username)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={username}
                                />
                                <TextField
                                    id="password"
                                    name="password"
                                    placeholder="Votre mot de passe"
                                    type="password"
                                    autoComplete="current-password"
                                    className="mt-3 mb-3"
                                    fullWidth
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText={touched.password ? errors.password : ""}
                                    error={touched.password && Boolean(errors.password)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={password}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name='remember_me'
                                            value={remember_me}
                                            color="primary"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />}
                                    label="Se souvenir de moi"
                                />
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
                                            SE CONNECTER
                                        </Button>
                                }
                                {
                                    message && (<Typography align='center' color='error'>
                                        {message}
                                    </Typography>)
                                }
                                <UILink component={Link} to='/inscription' color="inherit" className="mt-5 mb-3">
                                    Vous n'avez pas un compte? S'inscrire.
                                </UILink>
                            </form>);
                    }}
                />
            </Paper>
        </Section>;
    }
}
