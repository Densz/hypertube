import React, { Component } from 'react';
import validator from 'validator';
import "../css/settings.css";
import SettingsItem from './SettingsItem';
import { callApi, isLogged, callApiUpload } from '../../../ApiCaller/apiCaller';

class MyProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: {title: 'First Name', value: 'Fake', error: ''},
            lastName: {title: 'Last Name', value: 'Person', error: ''},
            email: {title: 'Email', value: 'fake@spam.com', error: ''},
            login: {title: 'Login', value: 'fakeperson69', error: 'heyyyyy'},
            passwd: {title: 'Password', value: '**********', error: ''},
            passwdConfirm: {title: 'Confirm Password', value: '', error: ''},
			picturePath: { value: '/images/heisenberg.png'},
			pictureError: ''
        };
		this.submitData = this.submitData.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
    }

	stringCapitalize(value) {
		return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
	}

    submitData = (name, value) => {
		return new Promise((res, rej) => {
			let errorBool = false;
			let error = '',
				item = this.state[name];
			if (value === '' || value === undefined) {
				errorBool = true;
				error = "Please enter updated " + item.title.toLowerCase();
			} else if (name === 'email') {
				if (!validator.isEmail(value)) {
					errorBool = true;
					error = 'Please provide a correct email address';
				}
			} else if (name === 'passwd') {
				console.log(value);
				if (value.trim().length < 6) {
					errorBool = true;
					error = 'Password must have at least 6 characters';
				}
			}
			if (errorBool) {
				this.setState({
					[name]: {
						...item,
						error: error
					}
				})
				 res({ success: false });
			} else {
				this.updateBackData(name, value, (stateReturn) => {
					if (stateReturn) {
						if (name !== 'email' && name !== 'passwd') {
							value = this.stringCapitalize(value);	
							this.setState({
								[name]: {
									...item,
									value: value
								}
							});
						}
						res({ success: true });
					} else {
						res({ success: false });						
					}
				});
			}
		})
	};
	
	updateBackData(key, value, cb) {
		const data = {key: key, value: value};
		callApi('/api/userLogged/update', 'post', data)
		.then((response) => {
			if (response.success) {
				cb(true);
			} else {
				cb(false);
			}
		});
	}

	handleUpload(event) {
		let errorBool = false;
		const pictureFile = event.target.files[0];
		const extName = pictureFile.name.slice((pictureFile.name.lastIndexOf(".") - 1 >>> 0) + 2);
		const extAllowed = ['jpg', 'jpeg', 'png'];
		const login = this.state.login.value;
		const submit = () => {
			document.getElementsByTagName('form')[0].submit();
		}

		if (pictureFile.size > 3145728) {
			this.setState({ pictureError: 'Image trop volumineuse' });
			errorBool = true;
		}
		if (extAllowed.indexOf(extName.toLowerCase()) === -1) {
			this.setState({ pictureError: 'Extension d\'image non pris en charge' });
			errorBool = true;
		}
		if (!errorBool) {
			callApiUpload(pictureFile, login)
			.then((response) => {
				if (response.success) {
					this.updateBackData('picturePath', response.namePic, submit, () => {});
				}
			})
		}
	}

    componentDidMount() {
        let bodyStyle = document.body.style;
        let navBarStyle = document.querySelector('.navbar').style;

        navBarStyle.background = '#20232a';
		bodyStyle.backgroundColor = '#f3f3f3';
		isLogged()
		.then((response) => {
			const data = response.infos;
			this.setState({
				firstName: {
					...this.state.firstName,
					value: data.firstName
				},
				lastName: {
					...this.state.lastName,
					value: data.lastName
				},
				login: {
					...this.state.login,
					value: data.login
				},
				picturePath: {
					...this.state.picturePath,
					value: data.picturePath
				},	
				email: {
					...this.state.email,
					value: data.email
				}
			})
		});
	}

    render () {
        return (
            <div className="block-container">
			<form encType="multipart/form-data">
				<input onChange={this.handleUpload} type="file" name="file" id="file"/>
			</form>
                <div className="container">
					{this.state.pictureError !== '' &&
					<div className="alert alert-danger fix-alert-danger">
						{this.state.pictureError}
					</div>}
					<div className="col-md-3" />
					<div className="col-md-9">
						<h1>Settings</h1>
					</div>
					<br/>
					<div className="row">
						<div className="col-md-3">
							<label htmlFor="file">
								<img src={this.state.picturePath.value} alt="Settings" className="picture-box" />
							</label>
						</div>
						<div className="col-md-9">
							<div className="row account-section">
								<div className="col-md-3">
									<h4>User Details</h4>
								</div>
								<div className="col-md-9 top-margin">
									<div className="row form-group align-middle detail-section">
										<div>
											<div className="col-md-12" onClick={this.handleClick}>
												<label>{this.state.login.title} :</label>
												<div className="text-value">
													{this.state.login.value}
												</div>
											</div>
										</div>
									</div>
									<SettingsItem name='firstName' type='text' capitalize={this.stringCapitalize} title={this.state.firstName.title + ' :'} item={this.state.firstName} submitData={this.submitData} />
									<SettingsItem name='lastName' type='text' capitalize={this.stringCapitalize} title={this.state.lastName.title + ' :'} item={this.state.lastName} submitData={this.submitData} />
								</div>
							</div>
							<div className="row account-section">
								<div className="col-md-3">
									<h4>Account Details</h4>
								</div>
								<div className="col-md-9 top-margin">
									<SettingsItem name='email' type='email' capitalize={this.stringCapitalize} title={this.state.email.title + ' :'} item={this.state.email} submitData={this.submitData} />
									<SettingsItem name='passwd' type='password' capitalize={this.stringCapitalize} title={this.state.passwd.title + ' :'} item={this.state.passwd} submitData={this.submitData} />
								</div>
							</div>
						</div>
					</div>
                </div>
            </div>
        );
    }
}

export default MyProfile;