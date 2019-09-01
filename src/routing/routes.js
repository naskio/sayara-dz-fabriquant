import React from "react";
import {
    DirectionsCar as CarIcon,
} from "@material-ui/icons";
import Models from '../views/dashboard/models';

export default {
    home: {
        label: 'Accueil',
        icon: CarIcon,
        component: (props) => (<div>Hello home</div>),
    },
    orders: {
        label: 'Commandes',
        icon: CarIcon,
        component: (props) => (<div>Hello Orders</div>),
    },
    models: {
        label: 'Modèles',
        icon: CarIcon,
        component: Models,
    },
    versions: {
        label: 'Versions',
        icon: CarIcon,
        component: (props) => (<div>Hello Versions</div>),
    },
    stock: {
        label: 'Stock',
        icon: CarIcon,
        component: (props) => (<div>Hello Stock</div>),
    },
    colors: {
        label: 'Couleurs',
        icon: CarIcon,
        component: (props) => (<div>Hello Colors</div>),
    },
    options: {
        label: 'Options',
        icon: CarIcon,
        component: (props) => (<div>Hello options</div>),
    },
    simulation: {
        label: 'Simulation du prix',
        icon: CarIcon,
        component: (props) => (<div>Hello Simulation</div>),
    },
};

/*
Features:
- Se connecter
- Se déconnecter
- modèles (CRUD)
- Versions (CRUD)
- Couleurs (CRUD)
- Options (CRUD)
- Afficher les véhicules disponibles (STOCK)
- Uploader fichier stock
- Simuler Prix (composer => simuler)
- Uploader fichier des tarifs
- Commandes (Lister, Accepter ou rejeter => maj stock)

Sections:
- Accueil
- Modèles
- Versions
- Stock
- Couleurs
- Options
- Simuler le prix
- Commandes
* */
