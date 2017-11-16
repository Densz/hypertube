import React, { Component } from 'react';

class Thumbnail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			infoToggled: false,
		};
		this.showInfo = this.showInfo.bind(this);
		this.hideInfo = this.hideInfo.bind(this);
		// this.title = (this.props.infos.title_english.length > 10) ? (this.props.infos.title_english.substring(0, 9) + '...') : (this.props.infos.title_english);
		this.title = (this.props.infos.title_english);
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
							<img className="play-button-overlay" alt="play" src="/images/play-button-overlay.png" />					
							<div className="about-movie-text">
								<p className="about-movie-text-title">{this.title}</p>
								<p className="about-movie-text-details">
									<span className="about-movie-text-year">{this.props.infos.year}</span>
									<span className="about-movie-text-rating"><img className="imdb-logo" alt="IMDB" src="/images/imdb.png" /> {this.props.infos.rating}</span>
								</p>
							</div>
						</div>
					</a>
				}
			</div>
		);
	}
}

export default Thumbnail;
