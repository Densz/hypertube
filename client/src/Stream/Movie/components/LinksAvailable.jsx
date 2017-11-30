
import React, { Component } from 'react';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/movie.css';

class LinksAvailable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			linksAvailable: {}
		}
	}

	componentDidMount() {
		if (this.props.categorie === "movies") {
			this.setState({
				linksAvailable: undefined
			})
		} else {
			this.callInfosEpisodes(this.props.imdb);
		}
	}

	callInfosEpisodes(id) {
		callApi('/api/movie/getEpisodes', 'post', { imdb_id: id })
		.then((infoTorrent) => {
			this.setState({
				linksAvailable: infoTorrent
			});
		})
	}

	render() {
		console.log(this.state);
		if (this.props.categorie === "tv_shows") {
			return(
				<div className="col-md-4">
					<h3 id="available">Available in :</h3>
					<div className="links_available"></div>
				</div>
			)
		} else {
			return(
				<div>
				</div>
			)
		}
	}
}

export default LinksAvailable;