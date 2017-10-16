import React, { Component } from 'react';
import SearchBar from '../../../General/components/SearchBar';

const ComponentRendered = (props) => {
    let rendering = [];
    if (props.signInButton) {
        rendering.push(<a href="/signIn" key={rendering.length} className="button-link">S'identifier</a>);
    } else if (props.catalogPage) {
        rendering.push(<SearchBar key={rendering.length} />);
    } if (props.loggedIn) {
        rendering.push(<a href="#" key={rendering.length} id="sign-out" className="button-link">Disconnect</a>);
    }
    return rendering;
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInBtn: false,
            catalogPage: false,
            loggedIn: true,
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

    render() {
        return(
            <nav className="navbar">
                <img src="/images/hypertube_logo.png" id="logo" className="navbar-brand" alt="hypertube"/> 
                <ComponentRendered 
                    loggedIn={this.state.loggedIn}
                    signInButton={this.state.signInBtn}
                    catalogPage={this.state.catalogPage}
                />
            </nav>
        );
    }
}

export default Header;