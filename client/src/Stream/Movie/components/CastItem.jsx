import React, { Component } from 'react';

class CastItem extends Component {
	render() {
		if (this.props.cast) {
			return(
				<div className="row cast_item">
					<div className="col-sm-3">
						<img
							src={this.props.cast.profile_path === null ? "/images/heisenberg.png" : "https://image.tmdb.org/t/p/w276_and_h350_bestv2/" + this.props.cast.profile_path} 
							alt={this.props.cast.name}
							className="img_cast_item"
						/>
					</div>
					<div className="col-sm-9">
						<div className="cast-infos">{this.props.cast.name}</div><div className="cast-infos">{this.props.cast.character}</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="row cast_item">
					<div className="col-sm-3">
						<img 
							src={this.props.crew.profile_path === null ? "/images/heisenberg.png" : "https://image.tmdb.org/t/p/w276_and_h350_bestv2/" + this.props.crew.profile_path} 
							alt={this.props.crew.name} 
							className="img_cast_item"
						/>
					</div>
					<div className="col-sm-9">
						<div className="cast-infos">{this.props.crew.name}</div>
						<div className="cast-infos">{this.props.crew.job}</div>
					</div>
				</div>
			)
		}
	}
}

export default CastItem;