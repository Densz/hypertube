import React, { Component } from 'react';
import '../css/profile.css';
import { callApi } from '../../../ApiCaller/apiCaller';
import { FormattedMessage } from "react-intl";

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			userInfo: this.props.userInfo,
			resultSearch: []
		};
		this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
	}

	componentDidMount() {
		const url_string = window.location.href; 
		const url = new URL(url_string);
		const userLogin = url.searchParams.get("login");
		this.setState({login: userLogin});
		callApi('/api/user/getInfoUser?login=' + userLogin)
		.then((response) => {
			if (response.success) {
				this.setState({userInfo: response.data})
			}
		})
		// .then(() => {
		// 	console.log('test')
		// 	const coverArray = { coverArray: this.state.userInfo.wishList};
		// 	callApi('/api/movie/getInfoMovie', 'post', coverArray)
		// 	.then((resp) => {
		// 		console.log(resp);
		// 	})
		// });
	}

	handleUpdateSearch(event, whitebox) {
		callApi('/api/user/getUsers?value=' + event.target.value)
		.then((response) => {
			if (!response.noData) {
				this.setState({resultSearch: response});
				if (this.state.resultSearch.length === 0) {
					whitebox = [];
				}
			}
		});
	}

	render() {
		let whitebox = [];
		// let wishList =[];
		// let videoLiked =[];
		// if (this.state.userInfo.wishList !== undefined) {
		// 	this.state.userInfo.wishList.map((elem, index) => {
		// 		wishList.push(	
		// 			<div>
		// 				<img src={elem} />
		// 			</div >
		// 		);
		// 	})
		// }
		// if (this.state.userInfo.videoLiked !== undefined) {
		// 	this.state.userInfo.videoLiked.map((elem, index) => {
		// 		videoLiked.push(
		// 			<div>
		// 				<img src={elem} />
		// 			</div >
		// 		);
		// 	})
		// }
		this.state.resultSearch.forEach((elem, index) => {
			whitebox.push(<div key={index} ><a href={"/profile?login=" + elem.login}>{elem.firstName} {elem.lastName} ({elem.login})</a></div>)
		})
		return (
			<div>
				<div className="row search-row">
					<div className="col-sm-8" />
					<div className="col-sm-4">
						<div className="search-box">
							<input type="text" name="searchUser" onChange={(event) => {this.handleUpdateSearch(event, whitebox)}} className="form-control search-container" placeholder="Search for ..." />
							{this.state.resultSearch.length !== 0 && 
								<div className="whiteBox">
									{whitebox}
								</div>
							}
						</div>
					</div>
				</div>
				<div className="row user-info">
					<div className="col-sm-5 profile-box-picture">
						<img src={this.state.userInfo.picturePath} alt="profile" className="picture-box profile-page-picture" />
					</div>
					<div className="col-sm-7 width-text-value">
						<div className="row info-profile">
							<div className="col-sm-12">
								<label>Login :</label><br/>
								<span className="text-value">{this.state.userInfo.login}</span>
							</div>
						</div>
						<div className="row info-profile">
							<div className="col-sm-12">
								<label><FormattedMessage id={'name'} /> :</label><br/>
								<span className="text-value">{this.state.userInfo.firstName} {this.state.userInfo.lastName}</span>
							</div>
						</div>
					</div>
				</div>
				{/* <div className="row tab-user-action">
					<div className="col-sm-6" id="wish-list">
						<h2><FormattedMessage id={'profile.wishList'} /></h2>
						{this.state.userInfo.wishList.length > 0 &&
							<div className="wishList">
								{wishList}
							</div>
						}
					</div>
					<div className="col-sm-6" id="video-like">
						<h2><FormattedMessage id={'profile.videoLiked'} /></h2>
						{this.state.userInfo.videoLiked.length > 0 &&
							<div className="videoLiked">
								{videoLiked}
							</div>
						}
					</div>
				</div> */}
			</div>
		);
	}
}

export default Profile;