import React, { Component } from 'react';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/movie.css';
import Moviedescription from './moviedescription';
import fs from 'fs';
import request from 'request';

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			poster: '',
			genres: [],
			budget: '',
			description: '',
			release_date: '',
			vote_average: '',
			vote_count: '',
			torrent720: '',
			torrent1080: '',
			infoTorrent: {},
		}
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';
	}

	componentWillMount() {
		this.callInfoMovie();
		this.callInfoTorrent();
	}

	callInfoMovie() {
		callApi('/api/movie/', 'post', {imdb_code: this.props.match.params.imdb})
		.then((infoMovie) => {
			console.log(infoMovie);
			this.setState((prevState) => ({
				title: infoMovie.original_title,
				poster: infoMovie.poster_path,
				genres: infoMovie.genres,
				budget: infoMovie.budget,
				description: infoMovie.overview,
				release_date: infoMovie.release_date,
				vote_average: infoMovie.vote_average,
				vote_count: infoMovie.vote_count
			}))
		})
	}

	callInfoTorrent() {
		callApi('/api/torrent/', 'post', {id: this.props.match.params.id})
		.then((infoTorrent) => {
			this.setState({
				infoTorrent: infoTorrent,
			});
			this.testTest();
		})
	}

	testTest() {
		callApi('/api/dlltorrent', 'post', {url: this.state.infoTorrent})
		.then((test) => {
			console.log(test);
		})
	}

	render() {
		return(
			<div className="container">
				<h1 className="movie-title">{this.state.title}</h1>
				<div className="MovieInfos">
					<video width="800" controls>
					</video>
				</div>
				<Moviedescription states={this.state}/>
			</div>
		)
	}
}

export default Movie;