import React, { Component } from 'react';
import SearchBar from '../../../General/components/SearchBar';

const ComponentRendered = (props) => {
    let rendering = (<div />);
    if (props.signInButton) {
        rendering = (<a href="/signIn" id="sign-in-link">S'identifier</a>);
    } else if (props.searchBar) {
        rendering = (<SearchBar />);
    }
    return rendering;
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInBtn: false,
            searchBar: false,
        }
    }
    
    componentWillMount() {
        let path = window.location.pathname;
    
        if (path === "/signUp" || path === "/forgottenPasswd") {
            this.setState({ signInBtn: true });
        }
         else if (path === "/catalog") {
            this.setState({ searchBar: true });
        }
    }

    render() {
        return(
            <nav className="navbar">
                <img src="/images/hypertube_logo.png" id="logo" className="navbar-brand" alt="hypertube"/> 
                <ComponentRendered signInButton={this.state.signInBtn} searchBar={this.state.searchBar}/>
            </nav>
        );
    }
}

export default Header;