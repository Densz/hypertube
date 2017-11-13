import React, { Component } from 'react';
import '../css/templates.css';
import Header from "./header";
import Footer from "./footer";

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                    <div className="container">
                        { this.props.children }
                    </div>
                {/* <Footer /> */}
            </div>
        );
    }
}

export default Layout;