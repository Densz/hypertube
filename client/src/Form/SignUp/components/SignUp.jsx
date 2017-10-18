import React, { Component } from 'react';
import SignUpBlock from './SignUpBlock';
import InputForm from "../../../General/components/InputForm";
import "../css/signup.css";
import callApi from '../../../ApiCaller/apiCaller';

class SignUp extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstName: {value: '', error: false},
			lastName: {value: '', error: false},
			email: {value: '', error: false},
			login: {value: '', error: false},
			passwd: {value: '', error: false},
			passwdConfirm: {value: '', error: false}
		}
        this.updateInputValue = this.updateInputValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

	updateInputValue = (key, value) => {			
		this.setState({
			[key]: {value: value, error: false}
		})
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
				this.setState({[elem]: {error: true}});
				errorBool = true;
			}
		}
		if (!errorBool)
			callApi('/api/signUp/submit', 'post', inputValues);
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
                                textValue="E-mail"
                                type="email"
                                inputClass={ this.state.email.error ? "form-control error" : "form-control" }
								name="email"
								onUpdate={this.updateInputValue}
                            />
                        </div>
                        <div className="row">
                            <InputForm
                                containerClass="form-group col-md-4"
                                textValue="Login"
                                type="text"
                                inputClass={ this.state.login.error ? "form-control error" : "form-control" }
								name="login"
								onUpdate={this.updateInputValue}
                            />
                            <InputForm
                                containerClass="form-group col-md-4"
                                textValue="Prénom"
                                type="text"
                                inputClass={ this.state.firstName.error ? "form-control error" : "form-control" }
								name="firstName"
								onUpdate={this.updateInputValue}
                            />
                            <InputForm
                                containerClass="form-group col-md-4"
                                textValue="Nom"
                                type="text"
                                inputClass={ this.state.lastName.error ? "form-control error" : "form-control" }
								name="lastName"
								onUpdate={this.updateInputValue}
                            />
                        </div>
                        <div className="row">
                            <InputForm
                                containerClass="form-group col-md-6"
                                textValue="Mot de passe"
                                type="password"
                                inputClass={ this.state.passwd.error ? "form-control error" : "form-control" }
								name="passwd"
								onUpdate={this.updateInputValue}
                            />
                            <InputForm
                                containerClass="form-group col-md-6"
                                textValue="Confirmer votre mot de passe"
                                type="password"
                                inputClass={ this.state.passwdConfirm.error ? "form-control error" : "form-control" }
								name="passwdConfirm"
								onUpdate={this.updateInputValue}
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