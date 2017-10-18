import React, { Component } from 'react';
import SignUpBlock from './SignUpBlock';
import InputForm from "../../../General/components/InputForm";
import "../css/signup.css";
import callApi from '../../../ApiCaller/apiCaller';

class SignUp extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			login: '',
			passwd: '',
			passwdConfirm: ''
		}
        this.updateValue = this.updateValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

	updateValue = (key, value) => {
		this.setState({
			[key]: value
		})
	}

    handleSubmit(event) {
        const inputValues = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            login: this.state.login,
            password: this.state.passwd,
            confirmPassword: this.state.passwdConfirm
        }
        event.preventDefault();
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
                                inputClass="form-control"
								name="email"
								onUpdate={this.updateValue}
                            />
                        </div>
                        <div className="row">
                            <InputForm
                                containerClass="form-group col-md-4"
                                textValue="Login"
                                type="text"
                                inputClass="form-control"
								name="login"
								onUpdate={this.updateValue}
                            />
                            <InputForm
                                containerClass="form-group col-md-4"
                                textValue="Prénom"
                                type="text"
                                inputClass="form-control"
								name="firstName"
								onUpdate={this.updateValue}
                            />
                            <InputForm
                                containerClass="form-group col-md-4"
                                textValue="Nom"
                                type="text"
                                inputClass="form-control"
								name="lastName"
								onUpdate={this.updateValue}
                            />
                        </div>
                        <div className="row">
                            <InputForm
                                containerClass="form-group col-md-6"
                                textValue="Mot de passe"
                                type="password"
                                inputClass="form-control"
								name="passwd"
								onUpdate={this.updateValue}
                            />
                            <InputForm
                                containerClass="form-group col-md-6"
                                textValue="Confirmer votre mot de passe"
                                type="password"
                                inputClass="form-control"
								name="passwdConfirm"
								onUpdate={this.updateValue}
                            />
                        </div>
                    </div>
				</form>
                <button className="login-button" onClick={this.handleSubmit}>
                    Créer son compte
                </button>
                <br/><br/>
                <hr/>
                <img src="/images/facebook.png" className="facebook-logo" alt="Facebook" />&nbsp;&nbsp;<a href="/loginWithFacebook">S'identifier avec Facebook ?</a>
			</SignUpBlock>
        );
    }
}

export default SignUp;