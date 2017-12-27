import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import SignIn from "./Form/SignIn/components/SignIn";
import SignUp from "./Form/SignUp/components/SignUp";
import GuestSignUp from "./Form/SignUp/components/GuestSignUp";
import Settings from "./UserInfo/Settings/components/Settings";
import Layout from "./General/templates/components/Layout";
import Catalog from "./Stream/Catalog/components/Catalog";
import Profile from "./UserInfo/Profile/components/Profile";
import Movie from "./Stream/Movie/components/Movie";
import NotFound from "./notFound";
import { isLogged } from "./ApiCaller/apiCaller";

class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogged: false, // to acces to catalog
			isFetching: false,
			subscriber: true,
			infos: {}
		}
		this.checkIfIsLogged = this.checkIfIsLogged.bind(this);
		this.checkIfIsLogged();
	}

	checkIfIsLogged() {
		isLogged()
		.then((response) => {
			if (response.infos.login === undefined) {
				this.setState({ subscriber: false });
			} else {
				this.setState({ subscriber: true });
			}
			this.setState(response);
		})
	}

    render() {
        return (
			<Layout 
				userInfo={this.state.infos}
				isLogged={ this.state.isLogged }
				subscriber={ this.state.subscriber }
				changeLngToFr={this.props.changeLngToFr}
				changeLngToEn={this.props.changeLngToEn}
			>
                <Router>
                    <div>
						{ this.state && this.state.isFetching &&
							<Switch>
								<Route exact path="/" render={() => (
									!this.state.isLogged ?
										( <SignIn checkIfIsLogged={this.checkIfIsLogged} /> ) :
										( <Redirect to="/catalog" /> )
								)} />
								<Route path="/signUp" render={() => (
									!this.state.isLogged ?
										( <SignUp checkIfIsLogged={this.checkIfIsLogged} /> ) :
										( <Redirect to="/catalog" /> )
								)} />
								<Route path="/guestSignUp" render={() => (
									!this.state.isLogged || this.state.subscriber ?
										( <Redirect to="/" />) :
										( <GuestSignUp checkIfIsLogged={this.checkIfIsLogged} /> )
								)} />
								<Route path="/settings" render={() => (
									!this.state.isLogged  || !this.state.subscriber ?
										( <Redirect to="/" /> ) :
										( <Settings /> )
								)} />
								<Route path="/profile" render={() => (
									!this.state.isLogged || !this.state.subscriber ?
										( <Redirect to="/" /> ) :
										( <Profile userInfo={this.state.infos} /> )
								)} />
								<Route path="/catalog" render={() => (
									!this.state.isLogged ?
										( <Redirect to="/" /> ) : 
										( <Catalog /> )
								)} />
								<Route path="/video/:categorie/:imdb" render={(props) => (
									!this.state.isLogged ?
									( <Redirect to="/" /> ) :
									( <Movie subscriber={this.state.subscriber} categorie={props.match.params.categorie} imdb={props.match.params.imdb} /> )
								)} />
								<Route path="/resetPassword/:id?" render={(props) => (
									<SignIn checkIfIsLogged={this.checkIfIsLogged} idResetPassword={props.match.params.id} />
								)}/>
								<Route path="*" component={ NotFound } />
							</Switch>
						}
                    </div>
                </Router>
            </Layout>
        );
    }
}

export default Routes;
