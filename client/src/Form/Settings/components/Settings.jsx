import React, { Component } from 'react';
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
            login: {title: 'Login', value: 'fakeperson69', error: ''},
            passwd: {title: 'Password', value: '**********', error: ''},
            passwdConfirm: {title: 'Confirm Password', value: '', error: ''},
			language: {title: 'Language', value: 'English', error: ''},
			picturePath: { value: '/images/heisenberg.png'}
        };
		this.submitData = this.submitData.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
    }

    submitData = (name, value) => {
        let error = '',
            item = this.state[name];
        console.log('name = ' + name + ' value = ' + value);
        if (value === '' || value === undefined) {
			error = "Please enter updated " + item.title.toLowerCase();
			console.log(error);
        } else {
			this.updateBackData(name, value, (stateReturn) => {
				if (stateReturn) {
					this.setState({
						[name]: {
							...this.state[name],
							value: value
						}
					})
					return false;
				} else {
					return true;
				}
			});
		}
	};
	
	updateBackData(key, value, cb) {
		const data = {key: key, value: value};
		callApi('/api/userLogged/update', 'post', data)
		.then((response) => {
			if (response.success) {
				cb(true);
			} else {
				cb(false)
			}
		});
	}

	handleUpload(event) {
		const pictureFile = event.target.files[0];
		const login = this.state.login.value;
		const submit = () => {
			document.getElementsByTagName('form')[0].submit();
		}
		callApiUpload(pictureFile, login)
		.then((response) => {
			if (response.success) {
				this.updateBackData('picturePath', response.namePic, submit, () => {});
			}
		})
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
								<div className="col-md-9">
									<SettingsItem name='login' type='text' item={this.state.login} submitData={this.submitData} />
									<SettingsItem name='firstName' type='text' item={this.state.firstName} submitData={this.submitData} />
									<SettingsItem name='lastName' type='text' item={this.state.lastName} submitData={this.submitData} />
								</div>
							</div>
							<div className="row account-section">
								<div className="col-md-3">
									<h4>Account Details</h4>
								</div>
								<div className="col-md-9">
									<SettingsItem name='email' type='email' item={this.state.email} submitData={this.submitData} />
									<SettingsItem name='password' type='password' item={this.state.passwd} submitData={this.submitData} />
									<SettingsItem name='language' type='text' item={this.state.language} submitData={this.submitData} />
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