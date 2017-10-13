import React, { Component } from 'react';
import Footer from "./footer";
import Header from "./header";
import './templates.css';

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                    { this.props.children }
                <Footer changeLngToFr={this.props.changeLngToFr} changeLngToEn={ this.props.changeLngToEn } />
            </div>
        );
    }
}

export default Layout;