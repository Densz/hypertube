import React, { Component } from 'react';
import Thumbnail from './Thumbnail';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/catalog.css';
import InfiniteScroll from 'react-infinite-scroller';
import CatalogNavigation from './CatalogNavigation';

class Catalog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			catalog: [],
			pages: 1,
			searchField: '',
			hasMore: true,
			sortBy: 'rating',
			genre: 'all',
			yearInterval: [1900, 2018],
			ratingInterval: [0, 10],
			categorie: "movies"
		}
		this.updateSearchInput = this.updateSearchInput.bind(this);
		this.onSliderChangeYear = this.onSliderChangeYear.bind(this);
		this.onSliderChangeRating = this.onSliderChangeRating.bind(this);
		this.changeCategorie = this.changeCategorie.bind(this);
		this.changeOptionInput = this.changeOptionInput.bind(this);
		this.searchFieldQueryOnClick = this.searchFieldQueryOnClick.bind(this);
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		const containerStyle = document.querySelector('.container').style;

		bodyStyle.backgroundColor = '#20232a';
		containerStyle.paddingRight = '0px';
		containerStyle.paddingLeft = '0px';
	}

	callMoreMovies() {
		this.setState({ hasMore: false });
		var json = {
			pages: this.state.pages,
			searchField: this.state.searchField,
			sortBy: this.state.sortBy,
			genre: this.state.genre,
			yearInterval: this.state.yearInterval,
			ratingInterval: this.state.ratingInterval,
			categorie: this.state.categorie
		}
		callApi('/api/catalog/callMoreItems', 'post', json)
		.then((catalogMovies) => {
			let catalogArray = this.state.catalog;
			if (catalogMovies.length > 0) {
				catalogMovies.map(
					(movieData) => {
						catalogArray.push(movieData);
						return undefined;
					}
				)
				this.setState((prevState) => ({
					...this.state,
					pages: prevState.pages + 1,
					hasMore: true
				}))
			} else {
				this.setState((prevState) => ({
					...this.state,
					hasMore: false
				}))
			}
		})
	}

	updateSearchInput(event) {
		let value = event.target.value;
		this.setState({
			searchField: value
		})
	}
	
	searchFieldQueryOnClick() {
		this.setState({
			catalog: [],
			pages: 1,
			hasMore: true
		})
	}

	onSliderChangeYear(value) {
		this.setState({
			yearInterval: value,
			catalog: [],
			pages: 1,
			hasMore: true
		})
	}

	onSliderChangeRating(value) {
		this.setState({
			ratingInterval: value,
			catalog: [],
			pages: 1,
			hasMore: true
		})
	}

	changeOptionInput(id, value) {
		this.setState({
			[id]: value,
			catalog: [],
			pages: 1,
			hasMore: true
		});
	}

	changeCategorie(categorieClicked) {
		this.setState({
			categorie: categorieClicked,
			catalog:[],
			pages: 1,
			hasMore: true
		})
	}

	render() {
		let items = [];
		this.state.catalog.map((movieData, index) => {
			items.push(<Thumbnail key={index} infos={movieData} categorie={this.state.categorie} videoSeen={movieData.videoSeen} />);
			return undefined;
		})
		return (
			<div>
				<CatalogNavigation 
					updateSearchInput={this.updateSearchInput}
					onSliderChangeRating={this.onSliderChangeRating}
					onSliderChangeYear={this.onSliderChangeYear}
					changeOptionInput={this.changeOptionInput}
					changeCategorie={this.changeCategorie}
					categorie={this.state.categorie}
					onSearchFieldClick={this.searchFieldQueryOnClick}
				/>
				<div className="row">
					<div className="catalog-box">
					<InfiniteScroll
						loadMore={this.callMoreMovies.bind(this)}
						hasMore= {this.state.hasMore}
						loader={<div>Loading ...</div>}
					>
						{items}
					</InfiniteScroll>
					</div>
				</div>
			</div>
		);
	}
}

export default Catalog;