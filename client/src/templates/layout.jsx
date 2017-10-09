import React, { Component } from 'react';
import './templates.css';
import Header from "./header";
import Footer from "./footer";

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                    { this.props.children }
                <Footer />
            </div>
        );
    }
}

export default Layout;