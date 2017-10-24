import React, { Component } from 'react';
import SignUpBlock from './SignUpBlock';
import InputForm from "../../../General/components/InputForm";
import "../css/signup.css";
import callApi from '../../../ApiCaller/apiCaller';

class SignUp extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstName: {title: 'Prénom', value: '', error: ''},
			lastName: {title: 'Nom', value: '', error: ''},
			email: {title: 'E-mail', value: '', error: ''},
			login: {title: 'Login', value: '', error: ''},
			passwd: {title: 'Mot de passe', value: '', error: ''},
			passwdConfirm: {title: 'Confirmation du mot de passe', value: '', error: ''}
		}
        this.updateInputValue = this.updateInputValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
				error: errorMessage
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
        for (var elem in this.state) {
            if (this.state[elem].value === '' || this.state[elem].value === undefined) {
				let title = this.state[elem].title.toLowerCase();
				this.setErrorMessage(elem, 'Le champ ' + title + ' est vide.');
				errorBool = true;
			}
		}
		if (!errorBool)
			callApi('/api/auth/signUp/submit', 'post', inputValues);
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
      			<h3>Inscrivez-vous pour profitez de vos films et séries préférées</h3>
                <br/>
				<form>
                    <h4>Créez votre compte</h4>
                    <div className="form-row">
                        <div className="row">
                            <InputForm
                                containerClass="form-group col-md-12"
                                textValue={this.state.email.title}
                                type="email"
                                inputClass={ this.state.email.error ? "form-control error" : "form-control" }
								name="email"
								onUpdate={ this.updateInputValue }
								errorMessage={ this.state.email.error }
                            />
                        </div>
                        <div className="row">
                            <InputForm
                                containerClass="form-group col-md-4"
                                textValue={this.state.login.title}
                                type="text"
                                inputClass={ this.state.login.error ? "form-control error" : "form-control" }
								name="login"
								onUpdate={this.updateInputValue}
								errorMessage={ this.state.login.error }
                            />
                            <InputForm
                                containerClass="form-group col-md-4"
                                textValue={ this.state.firstName.title }
                                type="text"
                                inputClass={ this.state.firstName.error ? "form-control error" : "form-control" }
								name="firstName"
								onUpdate={this.updateInputValue}
								errorMessage={ this.state.firstName.error }
                            />
                            <InputForm
                                containerClass="form-group col-md-4"
                                textValue={ this.state.lastName.title }
                                type="text"
                                inputClass={ this.state.lastName.error ? "form-control error" : "form-control" }
								name="lastName"
								onUpdate={this.updateInputValue}
								errorMessage={ this.state.lastName.error }
                            />
                        </div>
                        <div className="row">
                            <InputForm
                                containerClass="form-group col-md-6"
                                textValue={ this.state.passwd.title }
                                type="password"
                                inputClass={ this.state.passwd.error ? "form-control error" : "form-control" }
								name="passwd"
								onUpdate={this.updateInputValue}
								errorMessage={ this.state.passwd.error }
                            />
                            <InputForm
                                containerClass="form-group col-md-6"
                                textValue={ this.state.passwdConfirm.title }
                                type="password"
                                inputClass={ this.state.passwdConfirm.error ? "form-control error" : "form-control" }
								name="passwdConfirm"
								onUpdate={this.updateInputValue}
								errorMessage={ this.state.passwdConfirm.error }
                            />
                        </div>
                    </div>
					<br/>
					<button className="login-button" name="submit" value="submit" onClick={this.handleSubmit}>
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