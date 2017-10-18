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
				<img className="img-movie" alt={this.props.infos.title} src={this.props.infos.img} onMouseEnter={this.showInfo} />
				{this.state.infoToggled &&
				<div className="about-movie" onMouseLeave={this.showInfo}>
					<p className="movie-text">{this.props.infos.title}</p>
					<p className="movie-text">{this.props.infos.rating}</p>
				</div>
				}
			</div>
		);
	}
}

export default Thumbnail;
