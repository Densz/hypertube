import React, { Component } from 'react';
import Thumbnail from './thumbnail';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/catalog.css';
import InfiniteScroll from 'react-infinite-scroller';
import CatalogNavigation from './catalogNavigation';

class Catalog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			catalog: [],
			pages: 1,
			searchField: '',
			hasMore: true,
			sortBy: 'rating',
			genre: 'All',
			yearInterval: [1900, 2018],
			ratingInterval: [0, 10],
			categorie: "movies"
		}
		this.updateSearchInput = this.updateSearchInput.bind(this);
		this.onSliderChangeYear = this.onSliderChangeYear.bind(this);
		this.onSliderChangeRating = this.onSliderChangeRating.bind(this);
		this.changeCategorie = this.changeCategorie.bind(this);
		this.changeOptionInput = this.changeOptionInput.bind(this);
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
		callApi('/api/catalog/', 'post', { pages: this.state.pages, filterBy: this.state.filterBy, searchField: this.state.searchField })
		.then((catalogMovies) => {
			let catalogArray = this.state.catalog;
			if (catalogMovies.data.movies && catalogMovies.data.movies.length > 0) {
				catalogMovies.data.movies.map(
					(movieData) => {
						catalogArray.push(movieData);
						return undefined;
					}
				)
				this.setState((prevState) => ({
					...this.state,
					pages: prevState.pages + 1,
					hasMore: catalogMovies.data.movies.length < 16 ? false : true
				}))
			} else {
				this.setState({
					catalog: [],
					pages: 1,
					hasMore: false
				});
			}
		})
	}

	callMoreTvShows() {
		console.log('tu rentres bien dans TvShows et commencer a charger plus de films');
	}

	updateSearchInput(event) {
		let value = event.target.value;
		this.setState((prevState) => ({
			catalog: [],
			pages: 1,
			searchField: value,
			hasMore: true
		}))
	}

	onSliderChangeYear(value) {
		this.setState({
			yearInterval: value
		})
	}

	onSliderChangeRating(value) {
		this.setState({
			ratingInterval: value
		})
	}

	changeOptionInput(id, value) {
		this.setState({
			[id]: value
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
		console.log(this.state);
		let items = [];
		this.state.catalog.map((movieData, index) => {
			items.push(<Thumbnail key={index} infos={movieData} />);
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
				/>
				<div className="row">
					<div className="catalog-box">
					{ this.state.categorie === "movies" &&
						<InfiniteScroll
							loadMore={this.callMoreMovies.bind(this)}
							hasMore= {this.state.hasMore}
						>
							{items}
						</InfiniteScroll>
					}
					{ this.state.categorie === "tv_shows" &&
						<InfiniteScroll
							loadMore={this.callMoreTvShows.bind(this)}
							hasMore= {this.state.hasMore}
						>
							{items}
						</InfiniteScroll>
					}
					</div>
				</div>
			</div>
		);
	}
}

export default Catalog;