import React, { Component } from 'react';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/movie.css';
import Moviedescription from './moviedescription';

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieInfos: {}
		}
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';
	}

	componentWillMount() {
		this.callInfoMovie()
		this.callInfoTorrent()
	}

	callInfoMovie() {
		callApi('/api/movie/', 'post', {imdb_code: this.props.match.params.imdb})
		.then((infoMovie) => {
			console.log(infoMovie);
			this.setState({
				movieInfos: infoMovie
			})
		})
	}

	callInfoTorrent() {
		callApi('/api/torrent/', 'post', {id: this.props.match.params.id})
		.then((infoTorrent) => {
			this.setState({
				infoTorrent: infoTorrent
			});
		})
	}

	render() {
		return(
			<div className="container">
				<Moviedescription movieInfos={this.state.movieInfos}/>
				<div className="MovieInfos embed-responsive embed-responsive-16by9">
					<video className="embed-responsive-item" controls>
						<source src={"http://localhost:3001/api/torrent/" + this.props.match.params.id} type="video/mp4"/>>
					</video>
				</div>
			</div>
		)
	}
}

export default Movie;