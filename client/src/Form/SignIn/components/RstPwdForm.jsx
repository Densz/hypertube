import React, { Component } from 'react';
import SignInBlock from "./SignInBlock";
import InputForm from "../../../General/components/InputForm";
import { callApi } from '../../../ApiCaller/apiCaller';

class RstPwdForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: {title: 'E-mail', value: '', error: ''},
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
            email: this.state.email.value,
		}
		let errorBool = false;
        for (var elem in this.state) {
            if (this.state[elem].value === '' || this.state[elem].value === undefined) {
				let title = this.state[elem].title.toLowerCase();
				this.setErrorMessage(elem, 'Le champ ' + title + ' est vide.');
				errorBool = true;
			}
		}
		if (!errorBool) {
			callApi('/api/auth/sendEmail', 'post', inputValues)
			.then((response) => {
				console.log(response);
			})
		}
	}

	render() {
		return(
			<SignInBlock>
				<h3>Mot de passe oublié</h3>
				<form onSubmit={this.handleSubmit}>
					<InputForm
						containerClass="form-group"
						textValue={ this.state.email.title }
						type="email"
						name="email"
						inputClass={ this.state.email.error ? "form-control error" : "form-control" }
						onUpdate={this.updateInputValue}
						errorMessage={ this.state.email.error }
					/>
					<br />
					<button className="login-button" type="submit" name="submit" value="submit">
						Envoyer
					</button>
				</form>
				<br/>
				<a className="link-reset-password" onClick={this.props.linkClicked}>Connectez-vous</a>
				<br/><br/>
			</SignInBlock>
		)
	}
}

export default RstPwdForm;