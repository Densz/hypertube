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
								<FormattedMessage id="catalog.note" children={
									(formatedMessage) => <option value="rating">{formatedMessage}</option>
								}/>
								<FormattedMessage id="catalog.releasedDate" children={
									(formatedMessage) => <option value="year">{formatedMessage}</option>
								}/>
								<FormattedMessage id="catalog.title" children={
									(formatedMessage) => <option value="title">{formatedMessage}</option>
								}/>
							</select>
						</div>
					</div>
					<div className="col-sm-3">
						<label className="blue-font">Genre</label>
						<select className="form-control black" id="genre" name="Genre" onChange={this.changeSelectInput}>
							<FormattedMessage id="catalog.All" children={
								(formatedMessage) => <option value="all">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Action" children={
								(formatedMessage) => <option value="Action">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Adventure" children={
								(formatedMessage) => <option value="Adventure">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Animation" children={
								(formatedMessage) => <option value="Animation">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Biography" children={
								(formatedMessage) => <option value="Biography">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Comedy" children={
								(formatedMessage) => <option value="Comedy">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Crime" children={
								(formatedMessage) => <option value="Crime">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Documentary" children={
								(formatedMessage) => <option value="Documentary">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Drama" children={
								(formatedMessage) => <option value="Drama">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Family" children={
								(formatedMessage) => <option value="Family">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Fantasy" children={
								(formatedMessage) => <option value="Fantasy">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Film-Noir" children={
								(formatedMessage) => <option value="Film-Noir">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.History" children={
								(formatedMessage) => <option value="History">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Horror" children={
								(formatedMessage) => <option value="Horror">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Music" children={
								(formatedMessage) => <option value="Music">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Musical" children={
								(formatedMessage) => <option value="Musical">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Mystery" children={
								(formatedMessage) => <option value="Mystery">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.News" children={
								(formatedMessage) => <option value="News">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Romance" children={
								(formatedMessage) => <option value="Romance">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Sci-Fi" children={
								(formatedMessage) => <option value="Sci-Fi">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Short" children={
								(formatedMessage) => <option value="Short">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Sport" children={
								(formatedMessage) => <option value="Sport">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Thriller" children={
								(formatedMessage) => <option value="Thriller">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.War" children={
								(formatedMessage) => <option value="War">{formatedMessage}</option>
							}/>
							<FormattedMessage id="catalog.Western" children={
								(formatedMessage) => <option value="Western">{formatedMessage}</option>
							}/>
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