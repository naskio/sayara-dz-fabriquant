import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from '../../views/home';
import SignUp from '../../views/signUp';
import Login from '../../views/login';
import Dashboard from '../../views/dashboard';
import {BASE_NAME} from "../../config/config";
import routes from "../routes";
import {setAuthorizationToken} from "../../utils/axios";
import {Helmet} from 'react-helmet';


export default class extends React.PureComponent {
    componentDidMount() {

        const {token} = this.props;
        if (!token) {
            return;
        }
        setAuthorizationToken(token);
    }

    render() {
        const {token, title} = this.props;
        return (
            <>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <Router basename={BASE_NAME}>
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
                                <Route path={`/:page(${routes.map(item => item.id).join('|')})?`} component={Dashboard}/>
                                <Route path="*" component={Dashboard}/>
                            </Switch>)
                    }
                </Router>
            </>
        );
    }
}
