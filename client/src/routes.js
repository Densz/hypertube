import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import SignIn from "./Form/SignIn/components/SignIn";
import SignUp from "./Form/SignUp/components/SignUp";
import Layout from "./General/templates/components/Layout";
import Catalog from "./Stream/Catalog/components/catalog";

class Routes extends Component {
    render() {
        return (
            <Layout>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" component={SignIn} />
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
