import React, { Component } from 'react';
import './templates.css';

class Header extends Component {
    render() {
        return(
            <div className="navbar">
                <img src="/images/logo.png" className="logo" alt="hypertube" />
            </div>
        );
    }
}

export default Header;