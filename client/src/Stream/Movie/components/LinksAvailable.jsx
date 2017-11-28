
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

	componentWillMount() {
		// this.callInfoTorrent();
	}

	// callInfoTorrent() {
	// 	callApi('/api/torrent/', 'post', {id: this.props.match.params.id})
	// 	.then((infoTorrent) => {
	// 		this.setState({
	// 			infoTorrent: infoTorrent
	// 		});
	// 	})
	// }

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