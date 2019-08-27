import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Home from '../views/home';

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>topics</h2>;
}

export default class extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route
                        path="/dashboard"
                        render={({match: {url}}) => (
                            <>
                                <Route path={`${url}/about`} component={About}/>
                                <Route path={`${url}/topics`} component={Users}/>
                            </>
                        )}
                    />
                    <Route path="*" component={Home}/>
                </Switch>
            </Router>
        );
    }
}
