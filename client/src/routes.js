import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// import SignIn from "./components/Form/signIn";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/Form/signUp";
import ForgottenPasswd from "./components/Form/forgottenPasswd";
import ResetPasswd from "./components/Form/resetPasswd";
import Catalog from "./components/Homepage/catalog";
import Layout from "./templates/layout";

class Routes extends Component {
    render() {
        return (
            <Layout>
                <Router>
                    <div>
                        <Switch >
                            <Route path="/SignIn" component={ SignIn } />
                            <Route path="/signUp" component={ SignUp } />
                            <Route path="/forgottenPasswd" component={ ForgottenPasswd } />
                            <Route path="/resetPasswd" component={ ResetPasswd } />
                            <Route path="/catalog" component={ Catalog } />
                        </Switch>
                    </div>
                </Router>
            </Layout>
        );
    }
}

export default Routes;
