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
    // Link as UILink,
    Paper,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import {Lock} from "@material-ui/icons";
import {setAuthorizationToken} from "../../utils/axios";


const Section = styled.section`
  height: 100vh;
`;

const Logo = styled.img`
  height: 8rem;
  object-fit: contain;
`;

const Title = styled.h2`
    color: ${theme.COLORS.PRIMARY};
    font-size: 2rem;
    font-weight: ${theme.FONT_WEIGHT.MEDIUM};
`;


const Description = styled.p`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.SMALL};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
    text-align: center;
`;

const validationSchema = Yup.object({
    password: Yup.string("Entrez votre mot de passe").required("Ce champs est obligatoire"),
    repassword: Yup.string("Re-entrez votre mot de passe")
        .oneOf([Yup.ref('password')], 'Veuillez entrer le même mot de passe')
        .required("Ce champs est obligatoire"),
});

const initialValues = {
    password: '',
    repassword: '',
};


export default class View extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            user: undefined,
        };
    }

    componentDidMount() {
        const {setTitle, history, match, fetchProfile} = this.props;
        setTitle(`Sayara Dz - Initialisez votre mot de passe`);
        const {params: {token = ''}} = match;
        if (!token) {
            history.push("/");
        }
        setAuthorizationToken(token);
        fetchProfile()
            .then(data => this.setState({user: data}))
            .catch(err => {
                history.push("/");
            });
    }

    render() {
        const {setPassword, history, match} = this.props;
        const {params: {token}} = match;
        const {message, user} = this.state;
        return <Section className="container-fluid d-flex flex-column justify-content-center align-items-center">
            {
                !!user ? (<Paper className="col-10 col-md-8 col-lg-6 col-xl-4 p-5">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(data, {setSubmitting}) => {
                                this.setState({message: ''});
                                const {password} = data;
                                setPassword({password, token}).then(() => {
                                    history.push("/");
                                }).catch((err) => {
                                    if (err && err.response) {
                                        const {status} = err.response;
                                        this.setState({message: `Error ${status}`});
                                    } else {
                                        this.setState({message: `Unknown Error`});
                                    }
                                }).finally(() => setSubmitting(false));
                            }}
                            render={props => {

                                const {
                                    values: {
                                        password,
                                        repassword,
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
                                        <Title className="m-0">Initialisez votre mot de passe</Title>
                                        <Link to='/'>
                                            <Logo src={user.marque.logo}/>
                                        </Link>
                                        <Description>{user.prenom} {user.nom}, Bienvenue sur Sayara Dz. Veuillez entrer un mot de passe pour accèder à votre compte</Description>
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
                                        <TextField
                                            id="repassword"
                                            name="repassword"
                                            placeholder="Re-Entrez votre mot de passe"
                                            type="password"
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
                                            helperText={touched.repassword ? errors.repassword : ""}
                                            error={touched.repassword && Boolean(errors.repassword)}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={repassword}
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
                                                    CONFIRMER
                                                </Button>
                                        }
                                        {
                                            message && (<Typography align='center' color='error'>
                                                {message}
                                            </Typography>)
                                        }
                                    </form>);
                            }}
                        />
                    </Paper>) :
                    (<CircularProgress/>)
            }
            <Link to='/'>
                <Logo src={LOGO}/>
            </Link>
        </Section>;
    }
}
