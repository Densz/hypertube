import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import SignIn from "./components/Form/signIn";
import SignUp from "./components/Form/signUp";
import Header from "./templates/header";
import Footer from "./templates/footer";


class Routes extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header signInLink={ (window.location.href.indexOf('SignUp') === -1 ? '' : "S'identifier") }/>
                    <Switch >
                        <Route exact path="/" component={ SignIn } />
                        <Route path="/signUp" component={ SignUp } />
                    </Switch>
                    <Footer />                    
                </div>
            </Router>
        );
    }
}

export default Routes;