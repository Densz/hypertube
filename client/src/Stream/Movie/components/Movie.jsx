import React, { Component } from 'react';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/movie.css';
import Description from './Description';
import LinksAvailable from './LinksAvailable';
import CommentBlock from './CommentBlock';
import Cast from './Cast';
import { FormattedMessage } from 'react-intl';

export default class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieInfo: {},
			selectedMovieQuality: undefined, 
			qualitySelected: undefined,
			subtitlesEn: undefined,
			subtitlesFr: undefined,
			selectedSerie: undefined
		}
		this.ifIsMovieGetQuality = this.ifIsMovieGetQuality.bind(this);
		this.ifIsSerieGetEpisode = this.ifIsSerieGetEpisode.bind(this);
		this.getSubtitles = this.getSubtitles.bind(this);
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';

		callApi('/api/movie?idMovie=' + this.props.imdb);
	}
	
	componentWillMount() {
		callApi("/api/movie/getDataFromDatabase", "post", { imdb: this.props.imdb, categorie: this.props.categorie })
		.then((response) => {
			this.setState({
				movieInfo: response
			})
		})
	}

	ifIsMovieGetQuality(quality) {
		this.setState({
			qualitySelected: quality
		})
		this.getSubtitles();
	}

	ifIsSerieGetEpisode(episode, season, tvdb_id) {
		var series = {
			episode: episode,
			season: season,
			tvdb_id: tvdb_id
		};
		this.setState({
			selectedSerie: series
		});
		this.getSubtitles(series);
	}

	getSubtitles(series){
		var en, fr;
		callApi("/api/subtitles", "post", { imdb: this.props.imdb, categorie: this.props.categorie, serie: series})
		.then((res) => {
			if (res.en)
				en = "http://localhost:3000/subtitles/" + res.en;
			if (res.fr)
				fr = "http://localhost:3000/subtitles/" + res.fr;
			this.setState({
				subtitlesEn: en,
				subtitlesFr: fr
			});
			console.log(this.state.subtitlesEn);
			console.log(this.state.subtitlesFr);
		});
	}

	render() {
		let video = [];
		let subtitles = [];
		if (this.state.subtitlesEn) {
			subtitles.push(
				<track key="en" label="English" kind="subtitles" srclang="en" src={ this.state.subtitlesEn }></track>
			)
		}
		if (this.state.subtitlesFr) {
			subtitles.push(
				<track key="fr" label="French" kind="subtitles" srclang="fr" src={ this.state.subtitlesFr }></track>
			)
		}
		if (this.state.qualitySelected){
			video.push(
				<video
					movie="movie"
					className="embed-responsive-item" 
					controls poster={this.state.movieInfo.backdrop_path && "https://image.tmdb.org/t/p/w1400_and_h450_bestv2/" + this.state.movieInfo.backdrop_path}
					src={"http://localhost:3001/api/stream/film/" + this.props.imdb + "/" + this.state.qualitySelected}
					type="video/mp4"
				>
					{ subtitles }
				</video>
			)
		} else if (this.state.selectedSerie) {
			video.push(
				<video
					key="serie"
					className="embed-responsive-item" 
					controls poster={this.state.movieInfo.backdrop_path && "https://image.tmdb.org/t/p/w1400_and_h450_bestv2/" + this.state.movieInfo.backdrop_path}
					src={"http://localhost:3001/api/series/" + this.state.selectedSerie.tvdb_id + "/" + this.state.selectedSerie.season + "/" + this.state.selectedSerie.episode}
					type="video/mp4"
				>
					{ subtitles }
				</video>
			)
		} else {
			video.push(
				<video
					key="video"
					className="embed-responsive-item" 
					controls poster={this.state.movieInfo.backdrop_path && "https://image.tmdb.org/t/p/w1400_and_h450_bestv2/" + this.state.movieInfo.backdrop_path}
					type="video/mp4"
				>
					{ subtitles }
				</video>
			)
		}
		return(
			<div>
				<div className="row movie-details-block">
					<Description movie={ this.state.movieInfo } />
					<LinksAvailable 
						movie={ this.state.movieInfo }
						imdb={this.props.imdb}
						categorie={this.props.categorie}
						ifIsMovieGetQuality={this.ifIsMovieGetQuality}
						ifIsSerieGetEpisode={this.ifIsSerieGetEpisode}
					/>
				</div>
				<div className="MovieInfos embed-responsive embed-responsive-16by9 row">
					{ video }
				</div>
				<div className="row">
					<div className="col-md-6">
						<CommentBlock idMovie={this.props.imdb} subscriber={this.props.subscriber} />
					</div>
					<div className="col-md-6">
						<Cast id={ this.state.movieInfo.tmdbId } categorie={ this.state.movieInfo.categorieTmdb } />
					</div>
				</div>
			</div>
		)
	}
}

