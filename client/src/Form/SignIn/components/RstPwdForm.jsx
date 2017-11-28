import React, { Component } from 'react';
import SignInBlock from "./SignInBlock";
import InputForm from "../../../General/components/InputForm";
import { callApi } from '../../../ApiCaller/apiCaller';

class RstPwdForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: {title: 'E-mail', value: '', error: ''},
			done: ''
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
		this.setState({ done: '' });
        const inputValues = {
            email: this.state.email.value,
		}
		let errorBool = false;
		if (this.state.email.value === '' || this.state.email.value === undefined) {
			let title = this.state.email.title.toLowerCase();
			this.setErrorMessage('email', 'Le champ ' + title + ' est vide.');
			errorBool = true;
		}
		if (!errorBool) {
			callApi('/api/auth/sendEmail', 'post', inputValues)
			.then((response) => {
				if (!response.success) {
					this.setErrorMessage('email', response.msg);
					errorBool = true;
				}
				else {
					this.setState({done: 'Un email a été envoyé.'});
				}
			})
		}
	}

	render() {
		return(
			<SignInBlock>
				<h3>Mot de passe oublié</h3>
				{this.state.done !== '' && 
					<div className="alert alert-info">{this.state.done}</div>}
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