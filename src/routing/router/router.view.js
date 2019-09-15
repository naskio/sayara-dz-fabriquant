import React from "react";
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Route, Switch
} from "react-router-dom";
import Home from '../../views/home';
import SignUp from '../../views/signUp';
import Login from '../../views/login';
import Password from '../../views/password';
import Dashboard from '../../views/dashboard';
// import {BASE_NAME} from "../../config/config";
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
                            <Route path="/password/:token(\w{40})" component={Password}/>
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
