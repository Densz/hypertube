import React, { Component } from 'react';

class Description extends Component {
	componentWillMount() {
		// this.callInfoMovie()
		// this.callInfoTorrent()
	}
	
	// callInfoMovie() {
	// 	callApi('/api/movie/', 'post', {imdb_code: this.props.match.params.imdb})
	// 	.then((infoMovie) => {
	// 		console.log(infoMovie);
	// 		this.setState({
	// 			movieInfos: infoMovie
	// 		})
	// 	})
	// }

	// callInfoTorrent() {
	// 	callApi('/api/torrent/', 'post', {id: this.props.match.params.id})
	// 	.then((infoTorrent) => {
	// 		this.setState({
	// 			infoTorrent: infoTorrent
	// 		});
	// 	})
	// }

    render () {
        return (
			<div className="col-md-8">
				<div className="col-md-5 coverImg">
					{/* <img  /> */}
				</div>
				<div className="col-md-7">
					<h1>  </h1>
					<p className="GenreStyle"></p>
					_
					<br/>
					<br/>
					<p>Overview : </p>
					<p>Release : </p>
					<p>Note : </p>
				</div>
				
			</div>
        )
    }
}

export default Description;