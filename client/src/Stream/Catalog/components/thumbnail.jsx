import React, { Component } from 'react';

class Thumbnail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			infoToggled: false,
		};
		this.showInfo = this.showInfo.bind(this);
		this.hideInfo = this.hideInfo.bind(this);
	}

	showInfo() {
		this.setState({
			infoToggled: true
		});
	}

	hideInfo() {
		this.setState({
			infoToggled: false
		});
	}

	render() {
		return (
			<div className="movie-details" onMouseEnter={this.showInfo} onMouseLeave={this.hideInfo}>
				<img className="img-movie" alt={this.props.infos.title_english} src={this.props.infos.medium_cover_image}/>
				{ this.state.infoToggled &&
				<a href={"/video/" + this.props.infos.imdb_code + "/" + this.props.infos.id}>
					<div className="about-movie">
						<p className="movie-title">{this.props.infos.title}</p>
						<p className="movie-year">({this.props.infos.year})</p>
						<br/><br/>
						<p className="movie-rating">{this.props.infos.rating}</p>
						<span className="imdb">IMDB</span>
					</div>
				</a>
				}
			</div>
		);
	}
}

export default Thumbnail;
