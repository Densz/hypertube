import React, { Component } from 'react';

class ThumbnailEztv extends Component {
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
				<img className="img-movie" alt={this.props.infos.title} src={this.props.infos.cover_url}/>
				{ this.props.videoSeen === true &&
					<img src="/icons/essential/success.png" className="video-seen-mention" alt="checked"/>
				}
				{ this.state.infoToggled &&
					<a href={"/video/" + this.props.categorie + "/" + this.props.infos.imdb_id}>
						<div className="about-movie">
							<img className="play-button-overlay" alt="play" src="/images/play-button-overlay.png" />					
							<div className="about-movie-text">
								<p className="about-movie-text-title">{this.props.infos.title}</p>
								<p className="about-movie-text-details">
									<span className="about-movie-text-year">{this.props.infos.year}</span>
									<span className="about-movie-text-rating"><img className="imdb-logo" alt="IMDB" src="/images/imdb.png" /> {this.props.infos.imdb_rating}</span>
								</p>
							</div>
						</div>
					</a>
				}
			</div>
		);
	}
}

export default ThumbnailEztv;
