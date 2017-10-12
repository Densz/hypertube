import React, { Component } from 'react';
import './templates.css';


class Search extends Component {

    render() {
        return(
            <div id="tasoeur" className={ this.props.class } onClick={ this.props.updateClass }>
                <span className="glyphicon glyphicon-search"></span><span>&nbsp;&nbsp;{ this.props.valuePlaceHolder }</span>
            </div>
        );
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
        document.body.addEventListener('click', () => { this.setState({ 
            searchClicked: "search-bar", 
            placeHolder: "Rechercher",
        }) } );
        this.state = {
            searchClicked: "search-bar",
            placeHolder: "Rechercher",
        }
    }

    updateClassValue = () => {
//        ReactDOM.render(this.state.input, document.getElementById('tasoeur'));

        this.setState({
            searchClicked: "search-form",
            placeHolder: "Titres, personnes, genres",
        })
    }

    render() {
        let path = window.location.pathname;
        let button;
        if (path === "/SignUp" || path === "/forgottenPasswd"){
            button = (<a href="/" id="sign-in-link">S'identifier</a>);
        }
        return(
            <nav className="navbar">
                <img src="/images/logo.png" id="logo" className="navbar-brand" alt="hypertube"/>
                { button }
                <Search class={ this.state.searchClicked } updateClass={ this.updateClassValue.bind(this) } valuePlaceHolder={ this.state.placeHolder } />
            </nav>
        );
    }
}

export default Header;