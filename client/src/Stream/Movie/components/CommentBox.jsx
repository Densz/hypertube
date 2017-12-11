import React, { Component } from 'react';
import '../css/movie.css';
import CommentItem from './CommentItem';
import { FormattedMessage } from "react-intl";

const CommentList = (props) => {
	let commentNodes = [];
	props.comments.forEach((elem, index) => {
		if (index > 0) {
			commentNodes.unshift(<hr className="hr_cast_item" key={"hr." + index} />);
		}
		commentNodes.unshift(<CommentItem data={elem} infoUser={props.infoUser} key={index}/>);
	});
	return (<div className="cast-box">{commentNodes}</div>);
}

class CommentBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: [],
			currValue: ''
		};
		this.handleUpdateValue = this.handleUpdateValue.bind(this);
	}
	
	handleUpdateValue (event) {
		event.preventDefault();
		const value = event.target.value;
		this.setState({ currValue: value });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.commentsInfo.length !== this.state.comment.length) {
			this.setState({ comment: nextProps.commentsInfo });
		}
	}

	render() {
		if (this.state.comment !== undefined && this.state.comment.length > 0) {
			return (
				<div className="comment-box">
					<CommentList comments={this.state.comment} infoUser={this.props.infoUser} />
					{this.props.subscriber &&
						<div className="input-group comment-exists">
							<input type="text" name="Add comment" onChange={this.handleUpdateValue} className="form-control" placeholder="Your comment..." aria-label="Your comment..." />
							<span className="input-group-btn">
								<button className="btn btn-primary" type="button" onClick={() => { this.props.postComment(this.state.currValue) }} ><FormattedMessage id={'form.add'} /></button>
							</span>
						</div>
					}
				</div>
			);
		} else {
			return (
				<div className="comment-box empty-box">
					<p><FormattedMessage id={'movie.noCommentYet.1'} /></p>
					<p><FormattedMessage id={'movie.noCommentYet.2'} /></p>
					{this.props.subscriber &&
						<div className="input-group">
							<input type="text" name="Add comment" onChange={this.handleUpdateValue} className="form-control" placeholder="Your comment..." aria-label="Your comment..." />
							<span className="input-group-btn">
								<button className="btn btn-primary" type="button" onClick={() => { this.props.postComment(this.state.currValue) }} ><FormattedMessage id={'form.add'} /></button>
							</span>
						</div>
					}
				</div>
			);
		}
	}
}

export default CommentBox;