import React from "react";
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Route, Switch
} from "react-router-dom";
import Home from '../../views/home';
import SignUp from '../../views/signUp';
import Login from '../../views/login';
import Dashboard from '../../views/dashboard';
import {BASE_NAME} from "../../config/config";
import routes from "../routes";
import {Helmet} from 'react-helmet-async';


export default class extends React.PureComponent {

    render() {
        const {token, title} = this.props;
        return (
            <>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                {/*<Router basename={BASE_NAME}>*/}
                <Router basename='/'>
                    {
                        !token ? (<Switch>
                            {/*<Route exact path="/" component={Home}/>*/}
                            <Route path="/register" component={SignUp}/>
                            <Route path="/login" component={Login}/>
                            {/*<Route*/}
                            {/*    path="/dashboard"*/}
                            {/*    render={({match: {url}}) => (*/}
                            {/*        <>*/}
                            {/*            <Route path={`${url}/about`} component={Home}/>*/}
                            {/*            <Route path={`${url}/topics`} component={Home}/>*/}
                            {/*        </>*/}
                            {/*    )}*/}
                            {/*/>*/}
                            <Route path="*" component={Home}/>
                        </Switch>) : (
                            <Switch>
                                <Route path={`/:page(${Object.entries(routes).map(([key]) => key).join('|')})?`}
                                       component={Dashboard}/>
                                <Route path="*" component={Dashboard}/>
                            </Switch>)
                    }
                </Router>
            </>
        );
    }
}
