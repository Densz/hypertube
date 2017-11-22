import React, { Component } from 'react';
import { logOut } from '../../../ApiCaller/apiCaller';

const ComponentRendered = (props) => {
    let rendering = [];
    if (props.signInButton) {
        rendering.push(
			<a href="/" key={rendering.length}>
				<img src="/icons/interface/login.png" alt="logout" className="navbar-logo log-logo" />
			</a>
		);
	}
	if (props.isLogged) {
		rendering.push(
			<a href="/" key={rendering.length}>
				<img src="/icons/interface/logout.png" className="navbar-logo log-logo" alt="hypertube" onClick={logOut} />
			</a >
		);
        rendering.push(
			<a href="/settings" key={rendering.length}>
                <img src="/icons/multimedia/settings.png" className="navbar-logo" alt="hypertube" />
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
            isLogged: false
		}
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.isLogged === true) {
			this.setState({
				isLogged: true,
				signInBtn: false
			})
		}
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
	
	componentWillUpdate() {
		let path = window.location.pathname;

		if (this.state.signInBtn) {
			if (path !== "/signUp" && path !== "/forgottenPasswd")
				this.setState({ signInBtn: false });
		}
		if (this.state.catalogPage) {
			if (path !== "/catalog")
				this.setState({ catalogPage: false });
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