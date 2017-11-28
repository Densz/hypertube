import React, { Component } from 'react';
// import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/movie.css';
import Description from './Description';
import LinksAvailable from './LinksAvailable';
import Comments from './Comments';

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			torrentToRead: ""
		}
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';
	}

	render() {
		return(
			<div>
				<div className="row movie-details-block">
					<Description />
					<LinksAvailable />
				</div>
				<div className="MovieInfos embed-responsive embed-responsive-16by9">
					<video className="embed-responsive-item" controls>
						<source src={"http://localhost:3001/api/torrent/" + this.props.match.params.id} type="video/mp4"/>>
					</video>
				</div>
				<div>
					<Comments />
				</div>
			</div>
		)
	}
}

export default Movie;