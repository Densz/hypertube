import React, { Component } from 'react';

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