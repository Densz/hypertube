import React, { Component } from 'react';
import '../css/catalog.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class CatalogNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categorie: this.props.categorie
		}
		this.changeCategorie = this.changeCategorie.bind(this);
		this.changeSelectInput = this.changeSelectInput.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			categorie: nextProps.categorie
		})
	}

	changeCategorie(event) {
		this.props.changeCategorie(event.target.id);
	}

	changeSelectInput(event) {
		this.props.changeOptionInput(event.target.id, event.target.value);
	}

	render() {
		return (
		<div className="row filter-row">
			<div className="row">
				<div className="searchbar-catalog">
					<div className="col-sm-3"></div>
					<div className="col-sm-6">
						<div className="form-group">
							<h4 className="blue-font">Are you looking for something specific?</h4>
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
							<select className="form-control black" id="sortBy" onChange={this.changeSelectInput}>
								<option value="rating">Rating</option>
								<option value="year">Released date</option>
								{/* <option value="date_added">Date added</option> */}
							</select>
						</div>
					</div>
					<div className="col-sm-3">
						<label className="blue-font">Genre</label>
						<select className="form-control black" id="genre" name="Genre" onChange={this.changeSelectInput}>
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
						<Range min={1900} max={2018} defaultValue={[1900, 2018]} onAfterChange={this.props.onSliderChangeYear} pushable
							trackStyle={[{ backgroundColor: 'grey' }, { backgroundColor: 'black' }]}
							handleStyle={[{ backgroundColor: 'white' }, { backgroundColor: 'grey' }]}
							railStyle={{ backgroundColor: 'white' }}
						/>
					</div>
					<div className="col-sm-3">
						<label className="blue-font">IMDB Rating</label>
						<Range min={0} max={10} defaultValue={[0, 10]} onAfterChange={this.props.onSliderChangeRating} pushable
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
						<h4 
							id="movies" 
							className={"categories " + (this.state.categorie === "movies" ? " selected-categorie" : "")}
							onClick={this.changeCategorie}>Movies</h4>
					</div>
					<div className="col-sm-3">
						<h4 id="tv_shows"
						className={"categories " + (this.state.categorie === "tv_shows" ? " selected-categorie" : "")}
						onClick={this.changeCategorie}>TV Shows</h4>
					</div>
					<div className="col-sm-3"></div>
				</div>
			</div>
		</div>
		)
	}
}

export default CatalogNavigation;