import React, { Component } from 'react';
import CommentBox from './CommentBox';
import { callApi } from '../../../ApiCaller/apiCaller';
import { FormattedMessage } from "react-intl";
import '../css/movie.css';

class CommentBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: [],
			commentNumber: 0,
			infoUser: {}
		}
		this.handlePostComment = this.handlePostComment.bind(this);
	}

	handlePostComment(value) {
		const commentValue = value;
		const data = { idMovie: this.props.idMovie, value: commentValue };
		callApi('/api/comment/postComment', 'post', data)
		.then((response) => {
			const tmpComment = this.state.comment;
			tmpComment.push(response.comment);
			this.setState({ comment: tmpComment, commentNumber: tmpComment.length });
		})
	}

	componentDidMount() {
		callApi('/api/comment/getComments?idMovie=' + this.props.idMovie)
		.then((response) => {
			if (response.success) {
				this.setState({ comment: response.value, commentNumber: response.value.length, infoUser: response.infoUser });
			} 
		})
	}

	render() {
		return(
			<div className="row comment-block">
				<div className="col-md-12">
					<h3>
						<div className="cast-button comment-title">
							{this.state.commentNumber} <FormattedMessage id={this.state.commentNumber > 1 ? 'movie.comments' : 'movie.comment'} />
						</div>
					</h3>
					<CommentBox commentsInfo={this.state.comment} postComment={this.handlePostComment} infoUser={this.state.infoUser} subscriber={this.props.subscriber} />
				</div>
			</div>
		)
	}
}

export default CommentBlock;