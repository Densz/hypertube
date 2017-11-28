import React, { Component } from 'react';
import '../css/movie.css';

class CommentBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: this.props.commentsInfo,
			currValue: ''
		};
		this.handleUpdateValue = this.handleUpdateValue.bind(this);
	}

	handleUpdateValue (event) {
		event.preventDefault();
		const value = event.target.value;
		this.setState({ currValue: value });
	}

	render() {
		if (this.state.comment.length > 0) {
			return (
				<div className="comment-box">

				</div>
			);
		} else {
			return (
				<div className="comment-box empty-box">
					<p>This video doens't have any comment yet.</p>
					<p>Add yours !</p>
					<div className="input-group">
						<input type="text" name="Add comment" onChange={this.handleUpdateValue} className="form-control" placeholder="Your comment..." aria-label="Your comment..." />
						<span className="input-group-btn">
							<button className="btn btn-primary" type="button" onClick={() => { this.props.postComment(this.state.currValue) }} >Add</button>
						</span>
					</div>
				</div>
			);
		}
	}
}

export default CommentBox;