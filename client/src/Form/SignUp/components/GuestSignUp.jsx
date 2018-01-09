import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignUpBlock from './SignUpBlock';
import InputForm from "../../../General/components/InputForm";
import "../css/signup.css";
import { callApi, callApiUpload } from '../../../ApiCaller/apiCaller';
import { FormattedMessage } from 'react-intl';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: {title: 'form.firstName', value: '', error: ''},
			lastName: {title: 'form.lastName', value: '', error: ''},
			email: {title: 'form.email', value: '', error: ''},
			login: {title: 'form.login', value: '', error: ''},
			passwd: {title: 'form.passwd', value: '', error: ''},
			passwdConfirm: {title: 'form.passwdConfirmation', value: '', error: ''},
			picture: { value: '/images/heisenberg.png', error: '' },
			picUploadedInfo: {},
			uploadDone: false,
			submitDone: false
		}
		this.updateInputValue = this.updateInputValue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.updateBackData = this.updateBackData.bind(this);
	}

	updateInputValue = (key, value) => {
		this.setState((prevState) => ({
			[key]: {
				title: prevState[key].title,
				value: value,

				error: ''
			}
		}))
	}

	updateBackData(data, cb) {
		callApi('/api/user/updatePassport', 'post', data)
			.then((response) => {
				if (response.success) {
					cb(true);
				} else {
					cb(false);
				}
			});
	}

	setErrorMessage = (elem, errorMessage) => {
		this.setState((prevState) => ({
			[elem]: {
				title: prevState[elem].title,
				error: errorMessage,
				value: prevState[elem].value
			}
		}))
	}

	handleSubmit(event) {
		event.preventDefault();
		let inputValues = {
			firstName: this.state.firstName.value,
			lastName: this.state.lastName.value,
			email: this.state.email.value,
			login: this.state.login.value,
			password: this.state.passwd.value,
			confirmPassword: this.state.passwdConfirm.value
		}
		const file = this.state.picUploadedInfo;
		const login = this.state.login.value;
		let extName = '';
		const extAllowed = ['jpg', 'jpeg', 'png'];
		let errorBool = false;

		if (file.name) {
			extName = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
			if (file.size > 3145728) {
				this.setState({ picture: {value: this.state.picture.value, error: 'picture.tooBig' } });
				errorBool = true;
			}
			if (extAllowed.indexOf(extName.toLowerCase()) === -1) {
				this.setState({ picture: {
					value: this.state.picture.value,
					error: 'picture.invalidExtension'
				}});
				errorBool = true;
			}
		} else {
			errorBool = true;
			this.setState({ picture: {value: this.state.picture.value, error: 'picture.missingPicture' } });
		}
		for (var elem in this.state) {
			if (this.state[elem].title !== undefined && (this.state[elem].value === '' || this.state[elem].value === undefined)) {
				this.setErrorMessage(elem, this.state[elem].title + ".isMissing");
				errorBool = true;
			}
		}
		if (!errorBool) {
			callApi('/api/auth/guestSignUp/submit', 'post', inputValues)
				.then((response) => {
					if (!response.success) {
						const errRes = response.errors;
						for (var k in errRes) {
							this.setErrorMessage(k, errRes[k]);
						}
					}
					else {
						callApiUpload(file, login)
							.then((response) => {
								if (!response.success) {
									// Upload error
									console.log('handle front error');
									console.log(response.errors);
								} else {
									inputValues.picturePath = response.namePic;
									this.updateBackData(inputValues, (resp) => {
										if (resp === true) {
											this.props.checkIfIsLogged();
											this.setState({submitDone: true});
										} else {
											console.log('Error updating passport data ' + resp.msg);
										}
									});
								}
							})
					}
				});
		}
	}

	handleUpload(event) {
		event.preventDefault();
		var reader = new FileReader();
		let pictureFile = event.target.files[0];
		if (pictureFile) {
			const extAllowed = ['jpg', 'jpeg', 'png'];
			const extName = pictureFile.name.slice((pictureFile.name.lastIndexOf(".") - 1 >>> 0) + 2);
			if (extAllowed.indexOf(extName) !== -1) {
				document.querySelector('.upload-container').style.border = '4px solid #ffffff';
				reader.onload = (e) => {
					const hexaResult = e.target.result.substring(e.target.result.indexOf(',') + 1);
					const buf = new Buffer(hexaResult, 'base64').toString('hex', 0, 4);
					const hexMask = ['ffd8ffe0', 'ffd8ffe1', '89504e47'];
					if (hexMask.indexOf(buf) !== -1) {
						this.setState({
							picture: {value: e.target.result, error: ''},
							picUploadedInfo: pictureFile,
							uploadDone: true
						});
					} else {
						this.setState({ picture: {
							value: this.state.picture.value,
							error: 'picture.invalidExtension'
						}});
					}
				}
				reader.readAsDataURL(pictureFile);
			} else {
				this.setState({ picture: {
					value: this.state.picture.value,
					error: 'picture.invalidExtension'
				}});
			}
		}
	}

	componentDidUpdate() {
		if (this.state.picture.error !== '') {
			document.querySelector('.upload-container').style.border = '1px solid #ff0000';
		}
	}

	componentDidMount() {
		let bodyStyle = document.body.style;
		let navBarStyle = document.querySelector('.navbar').style;

		navBarStyle.background = '#20232a';
		bodyStyle.backgroundColor = '#f3f3f3';
	}

	componentWillMount() {
		callApi('/api/auth/guestSignUp/getInfo')
			.then((response) => {
				if (response.success) {
					this.setState({
						firstName: {
							...this.state.firstName,
							value: response.value.firstName
						},
						lastName: {
							...this.state.lastName,
							value: response.value.lastName
						},
						email: {
							...this.state.email,
							value: response.value.email
						}
					})
				}
			});
	}

	render() {
		if (this.state.submitDone) {
			return (<Redirect to="/" />);
		} else {
			return (
				<SignUpBlock>
					<form onSubmit={this.handleSubmit} encType="multipart/form-data">
						<input onChange={this.handleUpload} type="file" name="file" id="file" />
						<br />
						<h3><FormattedMessage id={"form.guestSignup.title"} /></h3>
						<br />
						<h4><FormattedMessage id={"form.guestSignup.createNewAccount"} /></h4>
						<br />
						<div className="form-row">
							<div className="row">
								<div className="col-md-3">
									<div className="upload-container">
										<label htmlFor="file">
											<img src={this.state.picture.value} alt="Profile" className="profile-picture" />
										</label>
										{this.state.picture.error !== '' &&
											<span className="error-msg-picture">
												<FormattedMessage id={this.state.picture.error} />
											</span>
										}
									</div>
									<br />
								</div>
								<div className="col-md-9 form-right">
									<div className="row">
										<InputForm
											containerClass="form-group col-md-6"
											textValue={this.state.lastName.title}
											value={this.state.lastName.value ? this.state.lastName.value : ''}
											type="text"
											inputClass={this.state.lastName.error ? "form-control error" : "form-control"}
											name="lastName"
											onUpdate={this.updateInputValue}
											errorMessage={this.state.lastName.error}
										/>
										<InputForm
											containerClass="form-group col-md-6"
											textValue={this.state.firstName.title}
											value={this.state.firstName.value ? this.state.firstName.value : ''}
											type="text"
											inputClass={this.state.firstName.error ? "form-control error" : "form-control"}
											name="firstName"
											onUpdate={this.updateInputValue}
											errorMessage={this.state.firstName.error}
										/>
									</div>
									<div className="row">
										<InputForm
											containerClass="form-group col-md-6"
											textValue={this.state.login.title}
											type="text"
											inputClass={this.state.login.error ? "form-control error" : "form-control"}
											name="login"
											onUpdate={this.updateInputValue}
											errorMessage={this.state.login.error}
										/>
										<div className="col-md-6">
											<label className="input-filled">Email</label><br />
											<span>{this.state.email.value}</span><br/>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<InputForm
									containerClass="form-group col-md-6"
									textValue={this.state.passwd.title}
									type="password"
									inputClass={this.state.passwd.error ? "form-control error" : "form-control"}
									name="passwd"
									onUpdate={this.updateInputValue}
									errorMessage={this.state.passwd.error}
								/>
								<InputForm
									containerClass="form-group col-md-6"
									textValue={this.state.passwdConfirm.title}
									type="password"
									inputClass={this.state.passwdConfirm.error ? "form-control error" : "form-control"}
									name="passwdConfirm"
									onUpdate={this.updateInputValue}
									errorMessage={this.state.passwdConfirm.error}
								/>
							</div>
						</div>
						<br />
						<button className="login-button" type="submit" name="submit" value="submit">
							<FormattedMessage id={"form.signup.createNewAccount"} />
						</button>
					</form>
					<br /><br />
					<hr />
				</SignUpBlock>
			);
		}
	}
}

export default SignUp;