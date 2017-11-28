import React, { Component } from 'react';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/movie.css';
import Description from './Description';
import LinksAvailable from './LinksAvailable';
import CommentBlock from './CommentBlock';

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieInfo: {},
			torrentToRead: ""
		}
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';
	}

	componentWillMount() {
		callApi("/api/movie/getDataFromDatabase", "post", { imdb: this.props.match.params.imdb })
		.then((response) => {
			this.setState({
				movieInfo: response
			})
		})		
	}

	render() {
		console.log("movieInfo");
		console.log(this.state.movieInfo);
		return(
			<div>
				<div className="row movie-details-block">
					<Description movie={ this.state.movieInfo }/>
					<LinksAvailable movie={ this.state.movieInfo }/>
				</div>
				<div className="MovieInfos embed-responsive embed-responsive-16by9 row">
					<video className="embed-responsive-item" controls>
						{/* <source src={"http://localhost:3001/api/torrent/" + this.props.match.params.id} type="video/mp4"/>> */}
					</video>
				</div>
				<div className="row">
					<div className="col-md-6">
						<CommentBlock idMovie={this.props.match.params.imdb}/>
					</div>
					<div className="col-md-6">
					</div>
				</div>
			</div>
		)
	}
}

export default Movie;