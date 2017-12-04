import React, { Component } from 'react';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/movie.css';
import Description from './Description';
import LinksAvailable from './LinksAvailable';
import CommentBlock from './CommentBlock';
import Cast from './Cast';

export default class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieInfo: {},
			selectedMovieQuality: undefined, 
			selectedEpisode: undefined,
			qualitySelected: undefined,
			subtitlesEn: undefined,
			subtitlesFr: undefined
		}
		this.ifIsMovieGetQuality = this.ifIsMovieGetQuality.bind(this);
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';

		callApi('/api/movie?idMovie=' + this.props.match.params.imdb);
	}

	componentWillMount() {
		callApi("/api/movie/getDataFromDatabase", "post", { imdb: this.props.match.params.imdb, categorie: this.props.match.params.categorie })
		.then((response) => {
			this.setState({
				movieInfo: response
			})
		})
		callApi("/api/subtitles", "post", { imdb: this.props.match.params.imdb, categorie: this.props.match.params.categorie })
		.then((response) => {
			console.log(response);
			console.log(response.en);
			console.log(response.msg);
			if (response.en || response.fr) {
				this.setState({
					subtitlesEn: "http://localhost:3001/" + response.en,
					subtitlesFr: "../../../../../server/" + response.fr
				})
			}
			console.log('bite');
		})
	}

	ifIsMovieGetQuality(quality) {
		this.setState({
			qualitySelected: quality
		})
	}

	render() {
		let video = [];
		let subtitle = [];
		if (this.state.qualitySelected){
			if (this.state.subtitlesEn) {
				subtitle.push(
					<track label="English" kind="subtitles" srclang="en" src={ this.state.subtitlesEn }></track>
				)
				console.log("nate");
			}
			if (this.state.subtitlesFr) {
				subtitle.push(
					<track label="French" kind="subtitles" srclang="fr" src={ this.state.subtitlesFr }></track>
				)
				console.log("bait");
			}
			video.push(
				<video
					className="embed-responsive-item" 
					controls poster={this.state.movieInfo.backdrop_path && "https://image.tmdb.org/t/p/w1400_and_h450_bestv2/" + this.state.movieInfo.backdrop_path}
					src={"http://localhost:3001/api/stream/film/" + this.props.match.params.imdb + "/" + this.state.qualitySelected}
					type="video/mp4"
				>
					<track label="English" kind="subtitles" srclang="en" src="http://localhost:3001/subtitles/tt0111161en.vtt" default></track>
					<track label="French" kind="subtitles" srclang="fr" src="http://localhost:3001/subtitles/tt0111161en.vtt"></track>
					<track label="Korean" kind="subtitles" srclang="kr" src="http://localhost:3001/subtitles/tt0111161en.vtt"></track>
				</video>
			)
		} else {
			video.push(
				<video
					className="embed-responsive-item" 
					controls poster={this.state.movieInfo.backdrop_path && "https://image.tmdb.org/t/p/w1400_and_h450_bestv2/" + this.state.movieInfo.backdrop_path}
					type="video/mp4"
				>
				</video>
			)
		}
		return(
			<div>
				<div className="row movie-details-block">
					<Description movie={ this.state.movieInfo } />
					<LinksAvailable 
						movie={ this.state.movieInfo }
						imdb={this.props.match.params.imdb}
						categorie={this.props.match.params.categorie}
						ifIsMovieGetQuality={this.ifIsMovieGetQuality}
					/>
				</div>
				<div className="MovieInfos embed-responsive embed-responsive-16by9 row">
					{ video }
				</div>
				<div className="row">
					<div className="col-md-6">
						<CommentBlock idMovie={this.props.match.params.imdb} />
					</div>
					<div className="col-md-6">
						<Cast id={ this.state.movieInfo.tmdbId } categorie={ this.state.movieInfo.categorieTmdb } />
					</div>
				</div>
			</div>
		)
	}
}

