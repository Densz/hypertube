import React, { Component } from 'react';
import { logOut, isLogged } from '../../../ApiCaller/apiCaller';

const handleRedirections = (pageName) => {
	window.location.href = "http://localhost:3000/" + pageName;
}

const ComponentRendered = (props) => {
    let rendering = [];
    if (props.signInButton) {
        rendering.push(
			<a href="/">
				<img src="/icons/interface/login.png" alt="logout" className="navbar-logo log-logo" />
			</a>
		);
	}
	if (props.isLogged) {
		rendering.push(
			<a href="/">
				<img src="/icons/interface/logout.png" className="navbar-logo log-logo" alt="hypertube" onClick={logOut} />
			</a >
		);
        rendering.push(
            <a href="/myprofile">
                <img src="/icons/multimedia/avatar.png" className="navbar-logo" alt="hypertube" />
            </a >
        );
        // rendering.push(<a href="/" onClick={logOut} key={rendering.length} id="sign-out" className="button-link">Disconnect</a>);
    }
    return rendering;
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInBtn: false,
            catalogPage: false,
            isLogged: true,
		}
		isLogged()
		.then((response) => {
			this.setState({ isLogged: response.isLogged });
		})
    }

    componentWillMount() {
        let path = window.location.pathname;
    
        if (path === "/signUp" || path === "/forgottenPasswd") {
            this.setState({ signInBtn: true });
		}
         else if (path === "/catalog") {
            this.setState({ catalogPage: true });
        }
    }

    render() {
        return(
            <nav className="navbar">
				<a href="/">
					<img src="/images/hypertube_logo.png" id="logo" className="navbar-brand" alt="hypertube"/> 
                </a>
                <ComponentRendered 
                    isLogged={this.state.isLogged}
                    signInButton={this.state.signInBtn}
					catalogPage={this.state.catalogPage}
					logOutMethod={this.logOut}
                />
            </nav>
        );
    }
}

export default Header;