import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from '../views/home';
import SignUp from '../views/signUp';
import Login from '../views/login';
import {BASE_NAME} from "../config/config";

export default class extends React.Component {
    render() {
        return (
            <Router basename={BASE_NAME}>
                <Switch>
                    {/*<Route exact path="/" component={Home}/>*/}
                    <Route path="/inscription" component={SignUp}/>
                    <Route path="/connexion" component={Login}/>
                    <Route
                        path="/dashboard"
                        render={({match: {url}}) => (
                            <>
                                <Route path={`${url}/about`} component={Home}/>
                                <Route path={`${url}/topics`} component={Home}/>
                            </>
                        )}
                    />
                    <Route path="*" component={Home}/>
                </Switch>
            </Router>
        );
    }
}
