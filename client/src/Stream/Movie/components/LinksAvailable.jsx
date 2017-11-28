
import React, { Component } from 'react';
// import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/movie.css';

class LinksAvailable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			linksAvailable: {}
		}
	}

	render() {
		return(
			<div className="col-md-4">
				<h3 id="available">Available in :</h3>
				<div className="links_available"></div>
			</div>
		)
	}
}

export default LinksAvailable;