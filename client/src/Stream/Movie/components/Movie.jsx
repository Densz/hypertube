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
			errorPopUp: '',
			userInfo: {},
			videoLiked: false,
			wishList: false,
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
		this.handleSocialAction = this.handleSocialAction.bind(this);
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';

		callApi("/api/movie/getDataFromDatabase", "post", { imdb: this.props.imdb, categorie: this.props.categorie })
		.then((response) => {
			this.setState({
				movieInfo: response
			})
		})
		.then(() => {
			callApi('/api/movie?idMovie=' + this.props.imdb)
			.then((response) => {
				if (response.success) {
					this.setState({ userInfo: response.userInfo });
					if (this.state.userInfo.login !== undefined) {
						if (response.userInfo.videoLiked.indexOf(this.state.movieInfo.cover_url) !== -1) {
							this.changeIcon('videoLiked', '/icons/essential/like-1-filled.png')
							this.setState({ videoLiked: true });
						} 
						if (response.userInfo.wishList.indexOf(this.state.movieInfo.cover_url) !== -1) {
							this.changeIcon('wishList', '/icons/essential/checked-1.png')
							this.setState({ wishList: true });
						}
					}
				}
			});
		})
	}
	
	changeIcon(idIcon, iconPath) {
		document.querySelector('#' + idIcon).style.backgroundImage = "url(" + iconPath + ")";
	}

	componentDidUpdate() {
		if (this.state.userInfo.login !== undefined) {
			if (this.state.videoLiked) this.changeIcon('videoLiked', '/icons/essential/like-1-filled.png');
			else this.changeIcon('videoLiked', '/icons/essential/like-1.png');
			if (this.state.wishList) this.changeIcon('wishList', '/icons/essential/checked-1.png');
			else this.changeIcon('wishList', '/icons/essential/add-2.png');
		}
	}

	componentWillMount() {
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
		});
	}

	handleSocialAction(event) {
		const key = event.target.id; 
		let data = {
			'key': key,
			'value': this.state.movieInfo.cover_url
		}
		if (!this.state[key]) {
			callApi('/api/user/actionUserVideo', 'post', data)
			.then((response) => {
				if (response.success) {
					this.setState({
						[key]: true,
						userInfo: response.userInfo
					 });
				} else {
					this.setState({ errorPopUp: response.msg });
				}
				console.log(this.state);
			})
		} else {
			data.dismiss = true;
			callApi('/api/user/actionUserVideo', 'post', data)
			.then((response) => {
				this.setState({
					[key]: false,
					userInfo: response.userInfo
				})
				console.log(this.state);
			})
		}
	}

	render() {
		let video = [];
		let subtitles = [];
		if (this.state.subtitlesEn) {
			subtitles.push(
				<track key="en" label="English" kind="subtitles" srcLang="en" src={ this.state.subtitlesEn }></track>
			)
		}
		if (this.state.subtitlesFr) {
			subtitles.push(
				<track key="fr" label="French" kind="subtitles" srcLang="fr" src={ this.state.subtitlesFr }></track>
			)
		}
		if (this.state.qualitySelected){
			video.push(
				<video
					movie="movie"
					key="movie"
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
					src={"http://localhost:3001/api/stream/series/" + this.props.imdb + "/" + this.state.selectedSerie.season + "/" + this.state.selectedSerie.episode}
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
				{this.state.userInfo.login !== undefined &&
				<div className="row row-action-movie">
					<div className="col-md-2 add-wish-list" id='wishList' onClick={this.handleSocialAction} />
					<div className="col-md-2 add-like" id='videoLiked' onClick={this.handleSocialAction} />
				</div>}
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

