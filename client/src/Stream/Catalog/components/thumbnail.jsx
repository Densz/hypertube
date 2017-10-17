import React, { Component } from 'react';

class Thumbnail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			infoToggled: false,
			divClass: 'movie-container-normal',
		};
		this.showInfo = this.showInfo.bind(this);
	}

	showInfo() {
		this.setState((prevState) => ({
			infoToggled: !prevState.infoToggled,
		}));
		if (this.state.divClass === 'movie-container-normal') {
			this.setState({ divClass: 'movie-container-bigger' });
		} else {
			this.setState({ divClass: 'movie-container-normal' });
		}
	}

	render() {
		return (
			<div className={this.state.divClass} onMouseEnter={this.showInfo} onMouseLeave={this.showInfo}>
				<div className="movie-details">
					<img alt={this.props.infos.title} src={this.props.infos.img} className="img-movie" />
					{this.state.infoToggled &&
						<div className="about-movie" >
							<p className="movie-title">{this.props.infos.title}</p>
							<p className="movie-rating">{this.props.infos.rating}</p>
						</div>
					}
				</div>
			</div>
		);
	}
}

export default Thumbnail;
