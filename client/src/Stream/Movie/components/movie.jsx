import React, { Component } from 'react';
import callApi from '../../../ApiCaller/apiCaller';
import '../css/movie.css';
import Movieview from './movieview';
import Moviedescription from './moviedescription';

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
			vote_count: ''
		}
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';
	}

	componentWillMount() {
		this.callInfoMovie();
	}

	callInfoMovie() {
		console.log(this.props.match);
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

	render() {
		return(
			<div className="container">
				<h1>{this.state.title}</h1>
				<Movieview />
				<Moviedescription states={this.state}/>
			</div>
		)
	}
}

export default Movie;