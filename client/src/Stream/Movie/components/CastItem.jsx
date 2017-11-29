import React, { Component } from 'react';

class CastItem extends Component {
	render() {
		console.log(this.props.cast);
		return(
			<div className="row cast_item">
				<img src={"https://image.tmdb.org/t/p/w276_and_h350_bestv2/" + this.props.cast.profile_path} alt={this.props.cast.name} className="img_cast_item" />
				<span className="cast-infos">{this.props.cast.name} as {this.props.cast.character}</span>
			</div>
		)
	}
}

export default CastItem;