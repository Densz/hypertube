import React, { Component } from 'react';
import '../css/footer.css';

class Footer extends Component {
    render() {
        return(
            // <div className="navbar-bottom">
            //     <div className="container">
            //         Languages : <a href="/ok">Français</a> | <a href="/ok">English</a>
            //     </div>
            // </div>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <p className="col- col-sm-6 col-md-6 col-lg-6  col-xl-6 text-footer"> Languages : <a className="text-footer" href="/ok">Français</a> | <a className="text-footer" href="/ok">English</a> </p>
                        <p className="col- col-sm-6 col-md-6 col-lg-6  col-xl-6 text-footer text-right">Designed by Agrumbac and Mprevot</p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;