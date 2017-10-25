import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import SignIn from "./Form/SignIn/components/SignIn";
import SignUp from "./Form/SignUp/components/SignUp";
import Layout from "./General/templates/components/Layout";
import Catalog from "./Stream/Catalog/components/catalog";
import Video from "./Stream/Movie/components/movie";

class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogged: false
		}
	}

    render() {
        return (
            <Layout>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" render={() => (
								this.state.isLogged ? (<Redirect to="/catalog"><Catalog /></Redirect>) : <SignIn />)} />
                            <Route path="/signUp" component={SignUp} />
                            <Route path="/catalog" component={Catalog} />
                            <Route path="/video/:imdb" component={Video} />
                        </Switch>
                    </div>
                </Router>
            </Layout>
        );
    }
}

export default Routes;
