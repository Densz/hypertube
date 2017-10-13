import React, { Component } from 'react';
import "../css/searchbar.css";

const SearchTab = (props) => {
    return (
        <div className="search-box">
            <button className="search-bar" onClick={props.event}>
                <span className="glyphicon glyphicon-search"></span><span>&nbsp;&nbsp;Rechercher</span>
            </button>
        </div>
    );
};

const SearchInput = () => {
    return (
        <div className="search-box">
            <div className="search-input">
                <span className="glyphicon glyphicon-search"></span>
                <input autoFocus id="input-search" placeholder="Titres, personnes, genres" type="text" name="searchBar"/>
            </div>
        </div>
    );
};

const ComponentRendered = (props) => {
    if (props.searchBool) {
        return <SearchInput event={props.tabOnClick}/>
    } else {
        return <SearchTab event={props.tabOnClick}/>
    }

};

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchClicked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({searchClicked: !this.state.searchClicked});
    };

    componentDidUpdate() {
        let inputSearch = document.querySelector('#input-search');

        if (inputSearch) {
            inputSearch.addEventListener('focusout', this.handleClick);
        }
    }
    
    render() {
        return (
            <ComponentRendered tabOnClick={this.handleClick} searchBool={this.state.searchClicked} />
        );
    }
}

export default SearchBar;