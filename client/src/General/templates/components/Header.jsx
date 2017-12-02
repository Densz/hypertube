import React, { Component } from 'react';
import { logOut } from '../../../ApiCaller/apiCaller';

const InfoGuest = (props) => {
	return(
		<div className="info-guest">
			<img src="/icons/multimedia/cancel.png" alt="cancel" className="close-info-guest" onClick={() => { props.infoGuest(false) }} />
			<span>{props.guestInfoText}</span><br/>
			<a href="/signUp">Cliquez ici !</a>
		</div>
	);
}

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
		if (props.subscriber) {
			rendering.push(
				<a href="/settings" key={rendering.length}>
					<img src="/icons/multimedia/settings.png" className="navbar-logo" alt="hypertube" />
				</a >
			);
			rendering.push(
				<a href={"/profile?login=" + props.userInfo.login} key={rendering.length}>
					<img src="/icons/multimedia/avatar.png" className="navbar-logo" alt="hypertube" />
				</a >
			)
		} else {
			rendering.push(
				<p className="navbar-guest-text" key={rendering.length}>
					Guest Profile
					<img src="/icons/essential/info.png" className="navbar-guest-logo" alt="hypertube" onClick={() => { props.infoGuest(true) }} />
				</p>
			);
		}
    }
    return rendering;
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInBtn: false,
            catalogPage: false,
			isLogged: false,
			infoGuestOn: false,
			guestInfoText: 'Pour avoir accès à toutes les fonctionnalités du site créer vous un compte'
		}
		this.handleInfoGuest = this.handleInfoGuest.bind(this);
    }

	handleInfoGuest(nextState) {
		this.setState((prevState) => ({
			infoGuestOn: nextState
		}))
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
					subscriber={this.props.subscriber}
					userInfo={this.props.userInfo}
					infoGuest={this.handleInfoGuest}
                />
				{this.state.infoGuestOn && <InfoGuest guestInfoText={this.state.guestInfoText} infoGuest={this.handleInfoGuest}/>}
            </nav>
        );
    }
}

export default Header;