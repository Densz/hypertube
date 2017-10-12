import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import SignIn from "./SignIn/components/SignIn";
import SignUp from "./SignUp/components/SignUp";
import Layout from "./templates/layout";

class Routes extends Component {
    render() {
        return (
            <Layout>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/SignIn" component={SignIn} />
                            <Route path="/SignUp" component={SignUp} />
                        </Switch>
                    </div>
                </Router>
            </Layout>
        );
    }
}

export default Routes;
