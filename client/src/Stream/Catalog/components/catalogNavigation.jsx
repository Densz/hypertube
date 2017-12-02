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
			categorie: this.props.categorie,
			searchInput: ""
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
							<div className="input-group">
								<input type="text" className="form-control catalog-search" onChange={this.props.updateSearchInput} placeholder="Search for..." />
								<span className="input-group-btn">
									<button type="submit" onClick={this.props.onSearchFieldClick} className="btn btn-secondary">Go!</button>
								</span>
							</div>
							
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
								<option value="title">Title</option>
							</select>
						</div>
					</div>
					<div className="col-sm-3">
						<label className="blue-font">Genre</label>
						<select className="form-control black" id="genre" name="Genre" onChange={this.changeSelectInput}>
							<option value="all">All</option>
							<option value="Action">Action</option>
							<option value="Adventure">Adventure</option>
							<option value="Animation">Animation</option>
							<option value="Biography">Biography</option>
							<option value="Comedy">Comedy</option>
							<option value="Crime">Crime</option>
							<option value="Documentary">Documentary</option>
							<option value="Drama">Drama</option>
							<option value="Family">Family</option>
							<option value="Fantasy">Fantasy</option>
							<option value="Film-Noir">Film-Noir</option>
							<option value="History">History</option>
							<option value="Horror">Horror</option>
							<option value="Music">Music</option>
							<option value="Musical">Musical</option>
							<option value="Mystery">Mystery</option>
							<option value="News">News</option>
							<option value="Romance">Romance</option>
							<option value="Sci-Fi">Sci-Fi</option>
							<option value="Short">Short</option>
							<option value="Sport">Sport</option>
							<option value="Thriller">Thriller</option>
							<option value="War">War</option>
							<option value="Western">Western</option>
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