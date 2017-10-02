import React, { Component } from 'react';
import './templates.css';

class Header extends Component {
    render() {
        return(
            <div className="navbar">
                <img src="/images/logo.png" className="navbar-brand logo" alt="hypertube" />
                <a href="/" className="navbar-nav">S'identifier</a>
            </div>
        );
    }
}

export default Header;