import React, { Component } from 'react';
import '../css/templates.css';
import Header from "./Header";
//import Footer from "./Footer";

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