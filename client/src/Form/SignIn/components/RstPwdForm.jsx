import React, { Component } from 'react';
import SignInBlock from "./SignInBlock";
import InputForm from "../../../General/components/InputForm";
import { callApi } from '../../../ApiCaller/apiCaller';
import { FormattedMessage } from 'react-intl';

class RstPwdForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: {title: 'form.email', value: '', error: ''},
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
			this.setErrorMessage('email', 'form.email.isMissing');
			errorBool = true;
		}
		if (!errorBool) {
			callApi('/api/auth/sendEmail', 'post', inputValues)
			.then((response) => {
				if (!response.success) {
					this.setErrorMessage('email', (response.guest ? "user.guest.title" : 'user.notRegistered'));
					errorBool = true;
				}
				else {
					this.setState({done: 'email.sent'});
				}
			})
		}
	}

	render() {
		return(
			<SignInBlock>
				<h3><FormattedMessage id={'form.forgottenpasswd'} /></h3>
				{this.state.done !== '' && 
					<div className="alert alert-info">
						<FormattedMessage id={this.state.done} />
					</div>
				}
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
						<FormattedMessage id={'send'} />
					</button>
				</form>
				<br/>
				<a className="link-reset-password" onClick={this.props.linkClicked}>
					<FormattedMessage id={'form.signin'} />
				</a>
				<br/><br/>
			</SignInBlock>
		)
	}
}

export default RstPwdForm;