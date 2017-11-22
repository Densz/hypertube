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
		callApi('/api/catalog/movies', 'post', json)
		.then((catalogMovies) => {
			let catalogArray = this.state.catalog;
			if ((catalogMovies.data.movies && catalogMovies.data.movies.length > 0) || catalogMovies.data.moviesIncoming === true ) {
				// Load movies and switch to the next page
				catalogMovies.data.movies.map(
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
			} else if (catalogMovies.data.movie_count > 0){
				// When you there is result in the catalog but there is no more movies to load
				this.setState({
					hasMore: false
				});
			} else {
				// When you there is value in search field and there is no result
				console.log("second");				
				this.setState({
					catalog: [],
					pages: 1,
					hasMore: false
				})
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
							loader={<div>Loading ...</div>}
						>
							{items}
						</InfiniteScroll>
					}
					{ this.state.categorie === "tv_shows" &&
						<InfiniteScroll
							loadMore={this.callMoreTvShows.bind(this)}
							hasMore= {this.state.hasMore}
							loader={<div className="loader">Loading ...</div>}							
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