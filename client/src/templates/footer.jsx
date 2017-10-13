import React, { Component } from 'react';
import './templates.css';


class Footer extends Component {
    render() {
        return(
            <div className="navbar-bottom">
                <div className="container">
                    Languages : <button onClick={ this.props.changeLngToFr }>
                                    Français
                                </button>&nbsp; | &nbsp;
                                <button onClick={ this.props.changeLngToEn}>
                                    English
                                </button>
                </div>
            </div>
        );
    }
}

export default Footer;