import React from 'react';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import configureStore from "./redux/configureStore";
import Router from "./routing/router";
import {ThemeProvider} from '@material-ui/styles';
import muiTheme from "./styles/muiTheme";


const {persistor, store} = configureStore();


export default () => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ThemeProvider theme={muiTheme}>
                <Router/>
            </ThemeProvider>
        </PersistGate>
    </Provider>
);
