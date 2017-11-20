import React, { Component } from 'react';
import '../css/catalog.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class CatalogNavigation extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div className="row filter-row">
			<div className="row">
				<div className="searchbar-catalog">
					<div className="col-sm-3"></div>
					<div className="col-sm-6">
						<div className="form-group">
							<h3 className="blue-font">Search</h3>
							<input type="text" onChange={this.props.updateSearchInput} className="form-control catalog-search" placeholder="Search..." />
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
						<label className="blue-font">Sort by</label>
							<select className="form-control black" id="sel1">
								<option>Rating</option>
								<option>Name</option>
								<option>Year</option>
							</select>
						</div>
					</div>
					<div className="col-sm-3">
						<label className="blue-font">Genre</label>
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
						<label className="blue-font">Year of Production</label>
						<Range min={1900} max={2018} defaultValue={[1900, 2018]} onChange={this.props.onSliderChangeYear} pushable
							trackStyle={[{ backgroundColor: 'grey' }, { backgroundColor: 'black' }]}
							handleStyle={[{ backgroundColor: 'white' }, { backgroundColor: 'grey' }]}
							railStyle={{ backgroundColor: 'white' }}
						/>
					</div>
					<div className="col-sm-3">
						<label className="blue-font">IMDB Rating</label>
						<Range min={0} max={10} defaultValue={[0, 10]} onChange={this.props.onSliderChangeRating} pushable
							trackStyle={[{ backgroundColor: 'grey' }, { backgroundColor: 'black' }]}
							handleStyle={[{ backgroundColor: 'white' }, { backgroundColor: 'grey' }]}
							railStyle={{ backgroundColor: 'white' }}/>
					</div>
					<div className="col-sm-3"></div>
				</div>
			</div>
			<div className="row">
				<div className="searchbar-catalog">
					<div className="col-sm-3"></div>
					<div className="col-sm-3">
						<h4 className="categories selected-categorie">Movies</h4>
					</div>
					<div className="col-sm-3">
						<h4 className="categories">TV Shows</h4>
					</div>
					<div className="col-sm-3"></div>
				</div>
			</div>
		</div>
		)
	}
}

export default CatalogNavigation;