import React, { Component } from 'react';
import './templates.css';

class Footer extends Component {
    render() {
        return(
            <div className="navbar-bottom">
                <div className="container">
                    Languages : <a href="/ok">Français</a> | <a href="/ok">English</a>
                </div>
            </div>
        );
    }
}

export default Footer;