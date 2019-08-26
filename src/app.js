import React from 'react';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import configureStore from "./redux/configureStore";
import Router from "./routing/router";

const {persistor, store} = configureStore();

export default () => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Router/>
        </PersistGate>
    </Provider>
);
