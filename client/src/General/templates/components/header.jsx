import React, { Component } from 'react';
import { logOut, isLogged } from '../../../ApiCaller/apiCaller';

const ComponentRendered = (props) => {
    let rendering = [];
    if (props.signInButton) {
        rendering.push(<a href="/" key={rendering.length} className="button-link">S'identifier</a>);
	}
	if (props.isLogged) {
		rendering.push(<img src="/icons/interface/logout.png" className="logout-logo" alt="hypertube" onClick={logOut} />)
		rendering.push(<img src="/icons/multimedia/avatar.png" className="logout-logo" alt="hypertube" />)
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
                <img src="/images/hypertube_logo.png" id="logo" className="navbar-brand" alt="hypertube"/> 
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