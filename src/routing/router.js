import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Home from '../views/home';
import {BASE_NAME} from "../config/config";

function Login() {
    return <h2>Se connecter</h2>;
}

function SignUp() {
    return <h2>S'inscrire</h2>;
}

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
