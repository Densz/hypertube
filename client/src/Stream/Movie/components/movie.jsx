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
			qualitySelected: undefined
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
	}

	ifIsMovieGetQuality(quality) {
		this.setState({
			qualitySelected: quality
		})
	}

	render() {
		let video = [];
		if (this.state.qualitySelected){
			video.push(
				<video
					className="embed-responsive-item" 
					controls poster={this.state.movieInfo.backdrop_path && "https://image.tmdb.org/t/p/w1400_and_h450_bestv2/" + this.state.movieInfo.backdrop_path}
					src={"http://localhost:3001/api/stream/film/" + this.props.match.params.imdb + "/" + this.state.qualitySelected}
					type="video/mp4"
				>
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

