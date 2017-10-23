import React, { Component } from 'react';
import '../css/movie.css';

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imdb_code: this.props.match.params.imdb
		}
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';
	}

	render() {
		return(
			<div className="row">
				<p>Imdb_code</p>
				{this.state.imdb_code}
			</div>
		)
	}
}

export default Movie;