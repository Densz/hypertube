import React, { Component } from 'react';
import './templates.css';

class Header extends Component {
    render() {
        return(
            <nav className="navbar">
                <img src="/images/logo.png" id="logo" className="navbar-brand" alt="hypertube"/>
                <a href="/" id="sign-in-link">{ this.props.signInLink }</a>
            </nav>
        );
    }
}

export default Header;