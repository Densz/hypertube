import React, { Component } from 'react';
import Thumbnail from './thumbnail';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/catalog.css';
import InfiniteScroll from 'react-infinite-scroller';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class Catalog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			catalog: [],
			pages: 1,
			searchField: '',
			hasMore: true,
			filterBy: 'like_count',
		}
		this.updateSearchInput = this.updateSearchInput.bind(this);
		this.onSliderChangeYear = this.onSliderChangeYear.bind(this);
		this.onSliderChangeRating = this.onSliderChangeRating.bind(this);
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		const containerStyle = document.querySelector('.container').style;

		bodyStyle.backgroundColor = '#20232a';
		containerStyle.paddingRight = '0px';
		containerStyle.paddingLeft = '0px';
	}

	callMoreMovies() {
		this.setState((prevState) => ({
			catalog: prevState.catalog,
			pages: prevState.pages,
			searchField: prevState.searchField,
			filterBy: prevState.filterBy,
			hasMore: false
		}))
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
					catalog: catalogArray,
					pages: prevState.pages + 1,
					searchField: prevState.searchField,
					filterBy: prevState.filterBy,
					hasMore: catalogMovies.data.movies.length < 16 ? false : true
				}))
			} else {
				this.setState((prevState) => ({
					catalog: [],
					pages: 1,
					searchField: prevState.searchField,
					filterBy: prevState.filterBy,
					hasMore: false
				}))
			}
		})
	}

	updateSearchInput(event) {
		let value = event.target.value;
		this.setState((prevState) => ({
			catalog: [],
			pages: 1,
			searchField: value,
			filterBy: prevState.filterBy,
			hasMore: true
		}))
	}

	onSliderChangeYear(value) {
		console.log(value);
	}

	onSliderChangeRating(value) {
		console.log(value);
	}

	render() {
		let items = [];
		this.state.catalog.map((movieData, index) => {
			items.push(<Thumbnail key={index} infos={movieData} />);
			return undefined;
		})

		return (
			<div>
				<div className="row filter-row">
					<div className="row">
						<div className="searchbar-catalog">
							<div className="col-sm-3"></div>
							<div className="col-sm-6">
								<div className="form-group">
									<h3>Search</h3>
									<input type="text" onChange={this.updateSearchInput} className="form-control catalog-search" placeholder="Search..." />
								</div>
							</div>
							<div className="col-sm-3"></div>
						</div>
					</div>
					<div className="row">
						<div className="searchbar-catalog">
							<div className="col-sm-3"></div>
							<div className="col-sm-3">
								<div className="form-group">
								<label>Sort by:</label>
									<select className="form-control black" id="sel1">
										<option>Rating</option>
										<option>Name</option>
										<option>Year</option>
									</select>
								</div>
							</div>
							<div className="col-sm-3">
								<label>Genre:</label>
								<select className="form-control black" id="sel1" name="Genre">
									<option value="all">All</option>
									<option value="action">Action</option>
									<option value="adventure">Adventure</option>
									<option value="animation">Animation</option>
									<option value="biography">Biography</option>
									<option value="comedy">Comedy</option>
									<option value="crime">Crime</option>
									<option value="documentary">Documentary</option>
									<option value="drama">Drama</option>
									<option value="family">Family</option>
									<option value="fantasy">Fantasy</option>
									<option value="film-noir">Film-Noir</option>
									<option value="history">History</option>
									<option value="horror">Horror</option>
									<option value="music">Music</option>
									<option value="musical">Musical</option>
									<option value="mystery">Mystery</option>
									<option value="news">News</option>
									<option value="romance">Romance</option>
									<option value="sci-fi">Sci-Fi</option>
									<option value="short">Short</option>
									<option value="sport">Sport</option>
									<option value="thriller">Thriller</option>
									<option value="war">War</option>
									<option value="western">Western</option>
								</select>
							</div>
							<div className="col-sm-3"></div>
						</div>
					</div>
					<div className="row">
						<div className="searchbar-catalog">
							<div className="col-sm-3"></div>
							<div className="col-sm-3">
								<p>Year of Production</p>
								<Range min={1900} max={2018} defaultValue={[1900, 2018]} onChange={this.onSliderChangeYear} pushable
									trackStyle={[{ backgroundColor: 'grey' }, { backgroundColor: 'black' }]}
									handleStyle={[{ backgroundColor: 'white' }, { backgroundColor: 'grey' }]}
									railStyle={{ backgroundColor: 'white' }}
								/>
							</div>
							<div className="col-sm-3">
								<p>IMDB Rating</p>
								<Range min={0} max={10} defaultValue={[0, 10]} onChange={this.onSliderChangeRating} pushable
									trackStyle={[{ backgroundColor: 'grey' }, { backgroundColor: 'black' }]}
									handleStyle={[{ backgroundColor: 'white' }, { backgroundColor: 'grey' }]}
									railStyle={{ backgroundColor: 'white' }}/>
							</div>
							<div className="col-sm-3"></div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="catalog-box">
						<InfiniteScroll
							loadMore={this.callMoreMovies.bind(this)}
							hasMore= {this.state.hasMore}
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