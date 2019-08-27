import React from 'react';
import {Paper, AppBar, Button, Fab, Divider} from '@material-ui/core';
import {FaFacebook, FaTwitter, FaInstagram} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {
    APP_PUB,
    APP_STORE,
    BACKGROUND5 as BACKGROUND,
    LOGO, LOGO_WHITE_AR, PLAY_STORE,
} from '../../assets/images';
import {ChevronRight,} from '@material-ui/icons';
import features from "../../assets/data/features";
import routes from "../../assets/data/homeRoutes";
import clients from "../../assets/data/clients";
import testimonials from "../../assets/data/testimonials";


import theme from "../../styles/theme";
import styled from 'styled-components';

const Container = styled.div``;

const Header = styled.header``;

const Logo = styled.img`
  height: 5.5rem;
  object-fit: contain;
`;

const LogoText = styled.span`
    color: ${theme.COLORS.PRIMARY_DARK};
    font-size: ${theme.FONT_SIZE.LARGE};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
`;

const LogoSubText = styled.span`
    color: ${theme.COLORS.SECONDARY};
    font-size: ${theme.FONT_SIZE.MEDIUM};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
`;

const Section = styled.section`
  min-height: 85vh;
`;

const Banner = styled.section`
  height: 100vh;
  background: center / cover no-repeat url(${BACKGROUND});
`;

const DownloadSection = styled.section`
  background: linear-gradient(90deg, ${theme.COLORS.PRIMARY}, ${theme.COLORS.PRIMARY_DARK} 50%);
`;

const A = styled.a`
    color: ${theme.COLORS.TEXT_DARK};
    font-size: ${theme.FONT_SIZE.SMALL};
    font-weight: ${theme.FONT_WEIGHT.MEDIUM};
    text-decoration: none;
    :hover{
      color: ${theme.COLORS.PRIMARY};
      text-decoration: none;
      -webkit-transition: color 350ms ease-in-out;
      -ms-transition: color 350ms ease-in-out;
      transition: color 350ms ease-in-out;
    }
    :focus {
      outline: none !important;
    }
`;

const WhiteTitle = styled.h1`
    color: #fff;
    font-size: 4rem;
    font-weight: ${theme.FONT_WEIGHT.MEDIUM};
`;

const Title = styled.h2`
    color: ${theme.COLORS.PRIMARY};
    font-size: 3rem;
    font-weight: ${theme.FONT_WEIGHT.MEDIUM};
`;

const SubTitle = styled.p`
    color: ${theme.COLORS.TEXT_DARK};
    font-size: ${theme.FONT_SIZE.MEDIUM};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
    text-align: center;
`;

const CardIcon = styled.img`
  height: 8rem;
  object-fit: contain;
  border-radius: 50%;
`;

const CardTitle = styled.p`
    color: ${theme.COLORS.PRIMARY_DARK};
    font-size: 1.5rem;
    font-weight: ${theme.FONT_WEIGHT.MEDIUM};
    text-align: center;
`;

const CardDescription = styled.p`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.SMALL};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
    text-align: center;
`;

const DownloadIcon = styled.img`
  height: 4rem;
  object-fit: contain;
`;

const DownloadTitle = styled.p`
    color: ${theme.COLORS.SECONDARY};
    font-size: 2.5rem;
    font-weight: ${theme.FONT_WEIGHT.MEDIUM};
    text-align: center;
`;

const DownloadDescription = styled.p`
    color: ${theme.COLORS.LIGHT};
    font-size: 1.5rem;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
    text-align: center;
`;

const BrandLogo = styled.img`
  height: 12rem;
  object-fit: contain;
`;

const Footer = styled.footer`
  background: linear-gradient(90deg, ${theme.COLORS.PRIMARY}, ${theme.COLORS.PRIMARY_DARK} 50%);
`;

const FooterA = styled.a`
    color: #fff;
    font-size: ${theme.FONT_SIZE.SMALL};
    font-weight: ${theme.FONT_WEIGHT.MEDIUM};
    text-decoration: none;
    :hover{
      color: ${theme.COLORS.SECONDARY};
      text-decoration: none;
      -webkit-transition: color 350ms ease-in-out;
      -ms-transition: color 350ms ease-in-out;
      transition: color 350ms ease-in-out;
    }
    :focus {
      outline: none !important;
    }
`;

const FooterText = styled.p`
    color: ${theme.COLORS.LIGHT};
    font-size: 1.2rem;
    font-weight: ${theme.FONT_WEIGHT.MEDIUM};
`;


export default class View extends React.PureComponent {
    constructor(props) {
        super(props);
        routes.forEach((item) => {
            this[item.id] = React.createRef();
        });
    }


    scrollTo = (id) => (e) => {
        e.preventDefault();
        window.scrollTo(0, this[id].current.offsetTop);
    };

    render() {
        return (
            <Container>
                <AppBar color="inherit" className="fixed-top flex-row justify-content-between align-items-center">
                    <div className="ml-5 d-flex align-items-center">
                        <Logo src={LOGO} alt="logo Sayara Dz" className="pl-2"/>
                        <LogoText>ayara</LogoText>
                        <LogoSubText className="align-self-end ml-1 pb-2">Dz</LogoSubText>
                    </div>
                    <Header className="flex-row mr-5">
                        {
                            routes.map((item) =>
                                <A
                                    className="p-3 mr-1 ml-1"
                                    key={item.id}
                                    onClick={this.scrollTo(item.id)}
                                    href={`#${item.id}`}
                                >
                                    {item.label}
                                </A>
                            )
                        }
                        <Link to='/connexion'>
                            <Button
                                color="primary" variant="outlined" className="mr-2" size="large">
                                Se Connecter
                            </Button>
                        </Link>
                        <Button href='/inscription' color="primary" variant="contained" className="ml-2" size="large">
                            S'inscrire
                        </Button>
                    </Header>
                </AppBar>
                <Banner className="d-flex flex-row justify-content-end align-items-center">
                    <div className="col-4 d-flex flex-column justify-content-center">
                        <WhiteTitle>
                            Gérez vos stocks, commandes et ventes
                        </WhiteTitle>
                        <div>
                            <Fab href='/inscription' variant="extended" size="large">
                                Rejoignez-nous
                                <ChevronRight/>
                            </Fab>
                        </div>
                    </div>
                    <div className="col-1"/>
                </Banner>
                <Section id="features" ref={this['features']}
                         className="container d-flex flex-column align-items-center">
                    <Title className="p-0 m-0 pt-5 mt-5">Nos Services</Title>
                    <div className="w-50 mb-5">
                        <SubTitle>All services include live updates including photos and chat,
                            as well as notifications of sitter arrival and departure times.</SubTitle>
                    </div>
                    <div className="d-flex flex-row justify-content-around">
                        {
                            features.map((item) => (
                                <Paper className="d-flex flex-column align-items-center mr-2 ml-2" key={item.title}>
                                    <CardIcon src={item.image} alt="Vente Icon" className="mt-5 mb-2"/>
                                    <CardTitle>{item.title}</CardTitle>
                                    <div className="col-11 mb-5">
                                        <CardDescription className="m-2">{item.description}</CardDescription>
                                    </div>
                                </Paper>
                            ))
                        }
                    </div>
                </Section>
                <DownloadSection className="d-flex flex-row justify-content-center">
                    <img src={APP_PUB} className="pt-5" alt="SayaraDz screenshot"/>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <DownloadTitle>Commandez votre voiture maintenant!</DownloadTitle>
                        <div className="container">
                            <DownloadDescription>Notre application est disponible sur n'importe quel appareil mobile!
                                Téléchargez
                                maintenant pour commencer!</DownloadDescription>
                        </div>
                        <div className="d-flex flex-row">
                            <a href={'#'}>
                                <DownloadIcon src={APP_STORE} className="mr-1 ml-1"/>
                            </a>
                            <a href={'#'}>
                                <DownloadIcon src={PLAY_STORE} className="mr-1 ml-1"/>
                            </a>
                        </div>
                    </div>
                </DownloadSection>
                <Section id="clients" ref={this['clients']} className="container d-flex flex-column align-items-center">
                    <Title className="p-0 m-0 pt-5 mt-5">Ils nous font confiance</Title>
                    <div className="d-flex flex-wrap justify-content-between mt-3 mb-5">
                        {
                            clients.map((client) => (
                                <BrandLogo src={client.logo} alt={`Logo ${client.name}`} className="m-3"
                                           key={client.name}/>
                            ))
                        }
                    </div>
                </Section>
                <Divider/>
                <Section id="testimonials" ref={this['testimonials']}
                         className="container d-flex flex-column align-items-center">
                    <Title className="p-0 m-0 mt-5">Témoignages Clients</Title>
                    <div className="w-50 mb-5">
                        <SubTitle>All services include live updates including photos and chat,
                            as well as notifications of sitter arrival and departure times.</SubTitle>
                    </div>
                    <div className="d-flex flex-row justify-content-around">
                        {
                            testimonials.map((item) => (
                                <Paper className="col-3 d-flex flex-column align-items-center mr-2 ml-2"
                                       key={item.title}>
                                    <CardIcon src={item.image} alt="Vente Icon" className="mt-5 mb-2"/>
                                    <CardTitle>{item.title}</CardTitle>
                                    <div className="mb-5">
                                        <CardDescription className="m-2">« {item.description} »</CardDescription>
                                    </div>
                                </Paper>
                            ))
                        }
                    </div>
                </Section>
                <Footer className="row p-5">
                    <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                        {/*<FooterText>Sayara Dz</FooterText>*/}
                        <Logo src={LOGO_WHITE_AR}/>
                        <FooterText>© TrendTech 2019</FooterText>
                    </div>
                    <div className="col-2 d-flex flex-column justify-content-center">
                        <FooterA href={'#'} className="p-2">À propos</FooterA>
                        <FooterA href={'#'} className="p-2">Contactez-nous</FooterA>
                        <FooterA href={'#'} className="p-2">Conditions d'utilisation</FooterA>
                    </div>
                    <div className="col-4 d-flex flex-column justify-content-center">
                        <FooterA href={'#'} className="p-2 d-flex align-items-center"><FaFacebook/><span
                            className="ml-2">Facebook</span></FooterA>
                        <FooterA href={'#'} className="p-2 d-flex align-items-center"><FaTwitter/><span
                            className="ml-2">Twitter</span></FooterA>
                        <FooterA href={'#'} className="p-2 d-flex align-items-center"><FaInstagram/><span
                            className="ml-2">Instagram</span></FooterA>
                    </div>
                    <div className="col-3">
                        <FooterText>Alger Oued Smar,، 16309، Oued Smar 16309</FooterText>
                        <FooterText>+213 23 93 91 32</FooterText>
                        <FooterText>contact@sayaradz.com</FooterText>
                    </div>
                </Footer>
            </Container>
        );
    }
}
