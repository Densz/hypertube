import React, { Component } from 'react';
import '../css/templates.css';
import Header from "./Header";
import Footer from "./Footer";

class Layout extends Component {
    render() {
        return (
            <div>
                <Header userInfo={this.props.userInfo} isLogged={this.props.isLogged} subscriber={this.props.subscriber} />
                    <div className="container">
                        { this.props.children }
                    </div>
				<Footer changeLngToFr={this.props.changeLngToFr} changeLngToEn={this.props.changeLngToEn} />
            </div>
        );
    }
}

export default Layout;