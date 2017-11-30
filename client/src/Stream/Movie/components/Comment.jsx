import React, { Component } from 'react';
import '../css/movie.css';

class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	render() {
		return (
			<div>
				{this.props.data.value}
			</div>
		);
	}
}

export default Comment;