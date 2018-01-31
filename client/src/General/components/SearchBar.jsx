import React, { Component } from 'react';
import "../css/searchbar.css";

const onUpdateFunction = (props, evt) => {
	props.updateValue(evt.target.value);
}

const SearchTab = (props) => {
    return (
        <button className="search-bar" onClick={props.event}>
            <span className="glyphicon glyphicon-search"></span>
        </button>		
    );
};	

const SearchInput = (props) => {
    let placeHolder = (props.placeHolder ? 'Titres, personnes, genres' : '');
    return (
        <div className="search-input">
            <span className="glyphicon glyphicon-search"></span>
            <input autoFocus
				id="input-search"
				placeholder={placeHolder} 
				type="text"
				name="searchBar"
				onChange={(evt) => { onUpdateFunction(props, evt)}}
            />
        </div>
    );
};

const ComponentRendered = (props) => {
    if (props.searchBool) {
        return <SearchInput event={props.tabOnClick} placeHolder={props.pH} updateValue={props.updateValue} />
    } else {
        return <SearchTab event={props.tabOnClick}/>
    }

};

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchClicked: false,
            containerClass: 'container-bar',
            placeHolder: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        setTimeout(() => {
            this.setState((prevState) => ({
                placeHolder: !prevState.placeHolder
            }));
        }, 200);
        this.setState((prevState) => ({searchClicked: !prevState.searchClicked}));
        this.setState({containerClass: (this.state.containerClass === 'container-bar' ? 'container-search' : 'container-bar')});
    };

    componentDidUpdate() {
		let inputSearch = document.querySelector('#input-search');

		if (inputSearch) {
			if (inputSearch.value.length === 0) {
				inputSearch.addEventListener('focusout', this.handleClick);				
			} else {
				inputSearch.removeEventListener('focusout', this.handleClick);
			}
        }
    }
    
    render() {
        return (
            <div className={this.state.containerClass + " search-box"}>
                <ComponentRendered tabOnClick={this.handleClick} searchBool={this.state.searchClicked} pH={this.state.placeHolder} updateValue={this.props.updateValue}/>
            </div>
        );
    }
}

export default SearchBar;