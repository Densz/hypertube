import React, { Component } from 'react';
import '../css/movie.css';

class CommentItem extends Component {
	render() {
		return(
			<div className="row cast_item">
				<div className="col-sm-3">
					<img
						src={this.props.data.defaultPicture === true ? "/images/heisenberg.png" : this.props.data.picturePoster}
						alt={this.props.data.login}
						className="img_cast_item"
					/>
				</div>
				<div className="col-sm-9">
					<div className="cast-infos post-date">{this.props.data.posted}</div>
					<div className="cast-infos post-login"><strong>{this.props.data.login}</strong></div>
					<div className="cast-infos post-value">{this.props.data.value}</div>
				</div>
			</div>
		);
	}
}

export default CommentItem;