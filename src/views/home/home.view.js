import React from 'react';
import {Link, Paper, AppBar, Button} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import {LOGO} from '../../assets/images';

import theme from "../../styles/theme";
import styled from 'styled-components';

const Container = styled.div``;

const Header = styled.header``;

const Logo = styled.img`
  height: 5.5rem;
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
  color: ${theme.COLORS.PRIMARY};
  height: 100vh;
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

const routes = [
    {
        id: 'features',
        label: 'Fonctionnalités',
    },
    {
        id: 'clients',
        label: 'Nos Clients',
    },
    {
        id: 'testimonials',
        label: 'Témoignages',
    },
];


// Fonctionnalités, Nos Clients, Témoignages, S'inscrire, Se connecter
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
                        <Button href={'#'} color="primary" variant="outlined" className="mr-2" size="large">
                            Se Connecter
                        </Button>
                        <Button href={'#'} color="primary" variant="contained" className="ml-2" size="large">
                            S'inscrire
                        </Button>
                    </Header>
                </AppBar>
                <Section id="features" ref={this['features']} style={{backgroundColor: '#fff'}}>

                </Section>
                <Section id="clients" ref={this['clients']} style={{backgroundColor: '#faa'}}>

                </Section>
                <Section id="testimonials" ref={this['testimonials']} style={{backgroundColor: '#22f'}}>

                </Section>
            </Container>
        );
    }
}
