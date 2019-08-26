import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import rootReducer from './rootReducer';
import thunk from "redux-thunk";
// import promise from 'redux-promise-middleware';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from "redux-persist";
import {name as appName} from "../../package.json";

const persistConfig = {
    key: "root",
    keyPrefix: appName,
    storage: storage,
    whitelist: [],
    // blacklists to ignore some reducers from persist
    // blacklist: [],
    // stateReconciler: autoMergeLevel2,
};

const middlewares = [
    thunk,
    // promise(),
];

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
if (dev === true) {
    middlewares.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(...middlewares));
    let persistor = persistStore(store);
    return {store, persistor};
};
