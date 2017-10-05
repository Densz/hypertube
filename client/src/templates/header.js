import React, { Component } from 'react';
import './templates.css';

class Header extends Component {
        render() {
            let path = window.location.pathname;
            let button;
            let search;
            if (path === "/SignUp" || path === "/forgottenPasswd"){
                button = (<a href="/" id="sign-in-link">S'identifier</a>);
            }
            if (path === "/catalog") {
                search = (<p class="search-bar"><span class="glyphicon glyphicon-search"></span>&nbsp;&nbsp;Rechercher</p>)
            }
            return(
                <nav className="navbar">
                    <img src="/images/logo.png" id="logo" className="navbar-brand" alt="hypertube"/>
                    { button }
                    { search }
                </nav>
            );
    }
}

export default Header;