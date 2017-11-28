import React, { Component } from 'react';
import { callApi } from '../../../ApiCaller/apiCaller';

class Cast extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cast: {},
			crew: {}
		}
	}

	componentWillMount() {
		console.log(this.props.movie);
		// callApi("api/movie/getPeople", )
	}

	render() {
		return(
			<div className="row comment-block">
				<div className="col-md-12">
					<h3>Casts</h3>
					<div className="cast-box">
					</div>
				</div>
			</div>
		)
	}
}

export default Cast;