import React, { Component } from 'react';
import SignInBlock from "./SignInBlock";
import InputForm from "../../../General/components/InputForm";
import { callApi } from '../../../ApiCaller/apiCaller';

class SignInForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: {title: 'Login', value: '', error: ''},
			passwd: {title: 'Mot de passe', value: '', error: ''},
		};
		this.updateInputValue = this.updateInputValue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
            login: this.state.login.value,
            password: this.state.passwd.value,
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
			callApi('/api/auth/signIn/submit', 'post', inputValues);
	}

	render() {
		return(
			<SignInBlock>
            <h3>S'identifier</h3>
            <form>
                <InputForm
                    containerClass="form-group"
                    textValue={ this.state.login.title }
                    type="email"
					inputClass={ this.state.login.error ? "form-control error" : "form-control" }
					name="login"
					onUpdate={ this.updateInputValue }
					errorMessage={ this.state.login.error }
                />
                <InputForm
                    containerClass="form-group"
					textValue={ this.state.passwd.title }
                    type="password"
					inputClass={ this.state.passwd.error ? "form-control error" : "form-control" }
					name="passwd"
					onUpdate={ this.updateInputValue }
					errorMessage={ this.state.passwd.error }
                />
				<br/>
				<button className="login-button" onClick={this.handleSubmit} name="submit" value="submit" type="submit" data-reactid="25">
					S'identifier
				</button>
            </form>
            <br/><br/>
            <a onClick={this.props.linkClicked}>Mot de passe oublié ?</a>
            <br/><br/>
            <hr/>
            <img src="/images/facebook.png" className="facebook-logo" alt="Facebook" />&nbsp;&nbsp;<a href="http://localhost:3001/api/login/facebook">S'identifier avec Facebook ?</a><br/>
            <img src="/images/42.png" className="facebook-logo" alt="42" />&nbsp;&nbsp;<a href="http://localhost:3001/api/login/fortytwo">S'identifier avec 42 - Born2Code ?</a>
			<hr/>
            <p>Première visite sur Hypertube ? <a href="/signUp">Inscrivez-vous</a>.</p>
        </SignInBlock>
		)
	}
}

export default SignInForm;