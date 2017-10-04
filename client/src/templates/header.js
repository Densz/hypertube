import React, { Component } from 'react';
import './templates.css';

class Header extends Component {
        render() {
            let path = window.location.pathname;
            let button;
            if (path === "/SignUp" || path === "/forgottenPasswd"){
                button = (<a href="/" id="sign-in-link">S'identifier</a>);
            }
            return(
                <nav className="navbar">
                    <img src="/images/logo.png" id="logo" className="navbar-brand" alt="hypertube"/>
                    { button }
                </nav>
            );
    }
}

export default Header;