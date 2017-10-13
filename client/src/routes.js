import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import SignIn from "./SignIn/components/SignIn";
import SignUp from "./SignUp/components/SignUp";
import Layout from "./templates/components/layout";
import Catalog from "./Homepage/components/catalog";

class Routes extends Component {
    render() {
        return (
            <Layout>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/signIn" component={SignIn} />
                            <Route path="/signUp" component={SignUp} />
                            <Route path="/catalog" component={Catalog} />
                        </Switch>
                    </div>
                </Router>
            </Layout>
        );
    }
}

export default Routes;
