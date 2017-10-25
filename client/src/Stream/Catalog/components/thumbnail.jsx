import React, { Component } from 'react';

class Thumbnail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			infoToggled: false,
		};
		this.showInfo = this.showInfo.bind(this);
	}

	showInfo() {
		this.setState(prevState => ({
			infoToggled: !prevState.infoToggled,
		}));
	}

	render() {
		return (
			<div className="movie-details">
				<img className="img-movie" alt={this.props.infos.title_english} src={this.props.infos.medium_cover_image} onMouseEnter={this.showInfo} />
				{ this.state.infoToggled &&
				<a href={"/video/" + this.props.infos.imdb_code}>
					<div className="about-movie" onMouseLeave={this.showInfo}>
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
