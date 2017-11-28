import React, { Component } from 'react';
import CommentBox from './CommentBox';
import { callApi } from '../../../ApiCaller/apiCaller';
import '../css/movie.css';

class CommentBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: [],
			commentNumber: 0
		}
		this.handlePostComment = this.handlePostComment.bind(this);
	}

	handlePostComment(event) {
		event.preventDefault();
		const commentValue = event.target.value;
		const data = { idMovie: this.props.idMovie, value: commentValue };
		callApi('/api/comment/postComment', 'post', data)
		.then((response) => {
			console.log(response);
			// const tmpComment = this.state.comment.push(response.comment);
			// this.setState({ comment: tmpComment });
		})
	}

	componentDidMount() {
		callApi('/api/comment/getComments?idMovie=' + this.props.idMovie)
		.then((response) => {
			if (response.success) {
				console.log(response);
				this.setState({ comment: response.value, commentNumber: response.value.length });
			} 
		})
	}

	render() {
		return(
			<div className="row comment-block">
				<div className="col-md-12">
					<h3>{this.state.commentNumber} Comments</h3>
					<CommentBox commentsInfo={this.state.comment} postComment={this.handlePostComment}/>
				</div>
			</div>
		)
	}
}

export default CommentBlock;