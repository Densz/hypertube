import React, { Component } from 'react';
import '../css/catalog.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { FormattedMessage } from 'react-intl';

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
							{/* <h4 className="blue-font">Are you looking for something specific?</h4> */}
							<label className="blue-font"><FormattedMessage id="catalog.searchFor"/></label>
							<div className="input-group">
								<input 
									type="text" 
									className="form-control catalog-search" 
									onChange={this.props.updateSearchInput} 
									placeholder="..."
								/>
								<span className="input-group-btn">
									<button type="submit" onClick={this.props.onSearchFieldClick} className="btn btn-secondary">
										<FormattedMessage id="catalog.go"/>
									</button>
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
						<label className="blue-font"><FormattedMessage id="catalog.sortBy"/></label>
							<select className="form-control black" id="sortBy" onChange={this.changeSelectInput}>
								<option value="rating"><FormattedMessage id="catalog.note"/></option>
								<option value="year"><FormattedMessage id="catalog.releasedDate"/></option>
								<option value="title"><FormattedMessage id="catalog.title"/></option>
							</select>
						</div>
					</div>
					<div className="col-sm-3">
						<label className="blue-font">Genre</label>
						<select className="form-control black" id="genre" name="Genre" onChange={this.changeSelectInput}>
							<option value="all"><FormattedMessage id="catalog.All"/></option>
							<option value="Action"><FormattedMessage id="catalog.Action"/></option>
							<option value="Adventure"><FormattedMessage id="catalog.Adventure"/></option>
							<option value="Animation"><FormattedMessage id="catalog.Animation"/></option>
							<option value="Biography"><FormattedMessage id="catalog.Biography"/></option>
							<option value="Comedy"><FormattedMessage id="catalog.Comedy"/></option>
							<option value="Crime"><FormattedMessage id="catalog.Crime"/></option>
							<option value="Documentary"><FormattedMessage id="catalog.Documentary"/></option>
							<option value="Drama"><FormattedMessage id="catalog.Drama"/></option>
							<option value="Family"><FormattedMessage id="catalog.Family"/></option>
							<option value="Fantasy"><FormattedMessage id="catalog.Fantasy"/></option>
							<option value="Film-Noir"><FormattedMessage id="catalog.Film-Noir"/></option>
							<option value="History"><FormattedMessage id="catalog.History"/></option>
							<option value="Horror"><FormattedMessage id="catalog.Horror"/></option>
							<option value="Music"><FormattedMessage id="catalog.Music"/></option>
							<option value="Musical"><FormattedMessage id="catalog.Musical"/></option>
							<option value="Mystery"><FormattedMessage id="catalog.Mystery"/></option>
							<option value="News"><FormattedMessage id="catalog.News"/></option>
							<option value="Romance"><FormattedMessage id="catalog.Romance"/></option>
							<option value="Sci-Fi"><FormattedMessage id="catalog.Sci-Fi"/></option>
							<option value="Short"><FormattedMessage id="catalog.Short"/></option>
							<option value="Sport"><FormattedMessage id="catalog.Sport"/></option>
							<option value="Thriller"><FormattedMessage id="catalog.Thriller"/></option>
							<option value="War"><FormattedMessage id="catalog.War"/></option>
							<option value="Western"><FormattedMessage id="catalog.Western"/></option>
						</select>
					</div>
					<div className="col-sm-3"></div>
				</div>
			</div>
			<div className="row">
				<div className="searchbar-catalog">
					<div className="col-sm-3"></div>
					<div className="col-sm-3">
						<label className="blue-font"><FormattedMessage id="catalog.year"/></label>
						<Range min={1900} max={2018} defaultValue={[1900, 2018]} onAfterChange={this.props.onSliderChangeYear} pushable
							trackStyle={[{ backgroundColor: 'grey' }, { backgroundColor: 'black' }]}
							handleStyle={[{ backgroundColor: 'white' }, { backgroundColor: 'grey' }]}
							railStyle={{ backgroundColor: 'white' }}
						/>
					</div>
					<div className="col-sm-3">
						<label className="blue-font"><FormattedMessage id="catalog.imdbRating"/></label>
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
						onClick={this.changeCategorie}>Series</h4>
					</div>
					<div className="col-sm-3"></div>
				</div>
			</div>
		</div>
		)
	}
}

export default CatalogNavigation;