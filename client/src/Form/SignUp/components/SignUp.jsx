import React, { Component } from 'react';
import SignUpBlock from './SignUpBlock';
import InputForm from "../../../General/components/InputForm";
import "../css/signup.css";
import { callApi, callApiUpload } from '../../../ApiCaller/apiCaller';
class SignUp extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstName: {title: 'Prénom', value: '', error: ''},
			lastName: {title: 'Nom', value: '', error: ''},
			email: {title: 'E-mail', value: '', error: ''},
			login: {title: 'Login', value: '', error: ''},
			passwd: {title: 'Mot de passe', value: '', error: ''},
			passwdConfirm: {title: 'Confirmation du mot de passe', value: '', error: ''},
			picture: '/images/heisenberg.png',
			picUploadedInfo: {},
			uploadDone: false,
		}
        this.updateInputValue = this.updateInputValue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
	}

	updateInputValue = (key, value) => {			
		this.setState((prevState) => ({
			[key]: {
				title: prevState[key].title,
				value: value, 
				
				error: ''}
		}))
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
        const inputValues = {
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            email: this.state.email.value,
            login: this.state.login.value,
            password: this.state.passwd.value,
			confirmPassword: this.state.passwdConfirm.value
			
		}
		let errorBool = false;
		if (!this.state.uploadDone) {
			errorBool = true;
			this.setErrorMessage('firstName', 'Vous devez choisir une photo pour vous inscrire');
		}
        for (var elem in this.state) {
            if (this.state[elem].title !== undefined && (this.state[elem].value === '' || this.state[elem].value === undefined)) {
				let title = this.state[elem].title.toLowerCase();
				this.setErrorMessage(elem, 'Le champ ' + title + ' est vide.');
				errorBool = true;
			}
		}
		if (!errorBool) {
			const file = this.state.picUploadedInfo;
			const login = this.state.login.value;
			callApi('/api/auth/signUp/submit', 'post', inputValues)
			.then((response) => {
				if (!response.success) {
					console.log('handle front error');
					console.log(response.errors);
					const errRes = response.errors;
					for(var k in errRes) {
						this.setErrorMessage(k, errRes[k]);
					}
				}
				else {
					callApiUpload(file, login)
					.then((response) => {
						if (!response.success) {
							console.log('handle front error');
							console.log(response.errors);
						}
						else {
							const data = {
								username: this.state.login.value,
								password: this.state.passwd.value
							}
							callApi('/api/login', 'post', data)
							.then((response) => {
								this.props.checkIfIsLogged();
							})
						}
					})
				}
			})

		}
	}

	handleUpload(event) {
		event.preventDefault();
		var reader = new FileReader();
		let pictureFile = event.target.files[0];
		console.log(pictureFile);
		reader.onload = (e) => {
			this.setState({
				picture: e.target.result,
				picUploadedInfo: pictureFile,
				uploadDone: true
			});
		}
		reader.readAsDataURL(pictureFile);
	}

    componentDidMount() {
        let bodyStyle = document.body.style;
        let navBarStyle = document.querySelector('.navbar').style;

        navBarStyle.background = '#20232a';
        bodyStyle.backgroundColor = '#f3f3f3';
    }

    render() {
        return (
			<SignUpBlock>
				<form onSubmit={this.handleSubmit} encType="multipart/form-data">
					<input onChange={this.handleUpload} type="file" name="file" id="file" />
					<h3>Inscrivez-vous pour profitez de vos films et séries préférées</h3>
					<br/>
						<h4>Créez votre compte</h4>
						<br/>
						<div className="form-row">
							<div className="row">
								<div className="col-md-2">
									<div className="upload-container">
										<label htmlFor="file">
											<img src={this.state.picture} alt="Profile" className="profile-picture" />
										</label>
									</div>
								</div>
								<div className="col-md-10">
									<div className="row">
										<InputForm
											containerClass="form-group col-md-6"
											textValue={this.state.lastName.title}
											type="text"
											inputClass={this.state.lastName.error ? "form-control error" : "form-control"}
											name="lastName"
											onUpdate={this.updateInputValue}
											errorMessage={this.state.lastName.error}
										/>
										<InputForm
											containerClass="form-group col-md-6"
											textValue={this.state.firstName.title}
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
										<InputForm
											containerClass="form-group col-md-6"
											textValue={this.state.email.title}
											type="email"
											inputClass={this.state.email.error ? "form-control error" : "form-control"}
											name="email"
											onUpdate={this.updateInputValue}
											errorMessage={this.state.email.error}
										/>
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
						<br/>
						<button className="login-button" type="submit" name="submit" value="submit">
							Créer son compte
						</button>	
				</form>
                <br/><br/>
                <hr/>
                <img src="/images/facebook.png" className="facebook-logo" alt="Facebook" />&nbsp;&nbsp;<a href="/loginWithFacebook">S'identifier avec Facebook ?</a>
			</SignUpBlock>
        );
    }
}

export default SignUp;