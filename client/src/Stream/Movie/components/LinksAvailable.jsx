
import React, { Component } from 'react';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/movie.css';
import { FormattedMessage } from 'react-intl';

class LinksAvailable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			linksAvailable: undefined,
			seasonSelected: 0,
			seasonClassName: "season-button",
			seasonClassNameSelected: "season-button selected",
			qualitySelected: undefined,
			episodeSelected: undefined
		}
		this.switchSeason = this.switchSeason.bind(this);
		this.setQuality = this.setQuality.bind(this);
		this.setEpisode = this.setEpisode.bind(this);
	}

	componentDidMount() {
		if (this.props.categorie === "tv_shows") {
			this.callInfosEpisodes(this.props.imdb);
		}
	}

	switchSeason(e) {
		this.setState({
			seasonSelected: e.target.id
		})
	}

	callInfosEpisodes(id) {
		callApi('/api/movie/getEpisodes', 'post', { imdb_id: id })
		.then((infoTorrent) => {
			this.setState({
				linksAvailable: infoTorrent
			});
		})
	}

	setQuality(e) {
		this.setState({
			qualitySelected: e.target.innerHTML
		})
		this.props.ifIsMovieGetQuality(e.target.innerHTML);
	}

	setEpisode(e) {
		let value = e.target.id
		this.setState({
			episodeSelected: value
		})
		let array = value.split('/');
		let tvdb_id = array[0];
		let episode = array[1];
		let season = array[2];
		this.props.ifIsSerieGetEpisode(episode, season, tvdb_id);
	}

	render() {
		let seasons = [];
		if (this.state.linksAvailable && this.props.categorie === "tv_shows") {
			Object.keys(this.state.linksAvailable).forEach(element => {
				seasons.push(
				<div 
					onClick={this.switchSeason} 
					id={element}
					key={element}
					className={ element === this.state.seasonSelected ? this.state.seasonClassNameSelected : this.state.seasonClassName }
				>
					Season {element}
				</div>);
			})
		}
		let episodes = [];
		let json = this.state.linksAvailable;
		// Series Part
		if (this.state.seasonSelected !== 0 && this.props.categorie === "tv_shows") {
			json[this.state.seasonSelected].forEach((element, index) => {
				episodes.push(
					<div 
						className={this.state.episodeSelected === element.tvdb_id + "/" + element.episode + "/" + this.state.seasonSelected ? "episode_div_selected" : "episode_div"}
						id={element.tvdb_id + "/" + element.episode + "/" + this.state.seasonSelected} 
						key={element.episode}
						onClick={this.setEpisode}
					>
						Episode {element.episode}: {element.title}
					</div>
				);
			});
		// Movies Part
		} else if (this.props.categorie === "movies" && this.props.movie.torrents) {
			this.props.movie.torrents.forEach((element, index) => {
				episodes.push(<div 
						className={this.state.qualitySelected === element.quality ? "episode_div_selected" : "episode_div"}
						id={element.quality}
						key={index}
						onClick={this.setQuality}
					>{element.quality}</div>
				)
			});
		}
		if (this.props.categorie === "tv_shows") {
			return(
				<div className="col-md-4">
					<h3 id="available">Links</h3>
					{seasons}
					{ this.state.linksAvailable &&
 						<div className="links_available">
 							{ episodes }
 						</div>
 					}
				</div>
			)
		} else if (this.props.categorie === "movies") {
			return(
				<div className="col-md-4">
					<div>
						<h3 id="available">
							<FormattedMessage id={'movie.links'} />
						</h3>
						<div className="links_available">
							{ episodes }
						</div>
					</div>
				</div>
			)
		}
	}
}

export default LinksAvailable;