import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import SignIn from "./Form/SignIn/components/SignIn";
import SignUp from "./Form/SignUp/components/SignUp";
import MyProfile from "./Form/MyProfile/components/MyProfile";
import Layout from "./General/templates/components/Layout";
import Catalog from "./Stream/Catalog/components/catalog";
import Video from "./Stream/Movie/components/movie";
import { isLogged } from "./ApiCaller/apiCaller";

class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogged: false, // to acces to catalog
			isFetching: false,
			infos: {}
		}
		isLogged()
		.then((response) => {
			this.setState(response);
			console.log(this.state);
		})
	}

    render() {
        return (
            <Layout>
                <Router>
                    <div>
						{ this.state && this.state.isFetching &&
							<Switch>
								<Route exact path="/" render={() => (
									!this.state.isLogged ?
									( <SignIn /> ) :
									( <Redirect to="/catalog"></Redirect> )
								)} />
								<Route path="/signUp" render={() => (
									!this.state.isLogged ?
									( <SignUp /> ) :
									( <Redirect to="/catalog"></Redirect> )
								)} />
								<Route path="/myProfile" render={() => (
									this.state.isLogged ?
									( <MyProfile /> ) :
									( <Redirect to="/"></Redirect> )
								)} />
								<Route path="/catalog" render={() => (
									!this.state.isLogged ?
									( <Redirect to="/"></Redirect> ) : 
									( <Catalog /> )
								)} />
								<Route path="/video/:imdb/:id" component={Video}/>
							</Switch>
						}
                    </div>
                </Router>
            </Layout>
        );
    }
}

export default Routes;
