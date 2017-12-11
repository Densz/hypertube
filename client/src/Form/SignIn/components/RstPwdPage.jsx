import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import SignInBlock from "./SignInBlock";
import { callApi } from "../../../ApiCaller/apiCaller";
import InputForm from "../../../General/components/InputForm";
import { FormattedMessage } from 'react-intl';

class RstPwdPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			passwd: { title: 'form.passwd', value: '', error: '' },
			passwdConfirm: { title: 'form.passwdConfirmation', value: '', error: '' },
			rstPwd: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateInputValue = this.updateInputValue.bind(this);
	}

	setErrorMessage = (elem, errorMessage) => {
		this.setState((prevState) => ({
			[elem]: {
				title: prevState[elem].title,
				value: prevState[elem].value,
				error: errorMessage
			}
		}))
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

	handleSubmit(event) {
		event.preventDefault();
		const inputValues = {
			passwd: this.state.passwd.value,
			passwdConfirm: this.state.passwdConfirm.value,
			id: this.props.idResetPassword
		}
		let errorBool = false;
		for (var elem in this.state) {
			if (this.state[elem].title !== undefined && (this.state[elem].value === '' || this.state[elem].value === undefined)) {
				this.setErrorMessage(elem, this.state[elem].title + '.isMissing');
				errorBool = true;
			}
		}
		if (!errorBool)
			callApi('/api/auth/rstPwd', 'post', inputValues)
			.then((response) => {
				console.log(response)
				if (!response.success) {
					const errRes = response.errors;
					for (var k in errRes) {
						this.setErrorMessage(k, errRes[k]);
					}
				}
				else {
					this.setState({ rstPwd: true });
					this.props.handleRstDone();
				}
			})
	}

	render() {
		if (this.state.rstPwd) {
			return (<Redirect to="/" />);
		}
		return (
			<SignInBlock>
				<h3><FormattedMessage id={'form.resetpasswd.title'} /></h3>
				<form onSubmit={this.handleSubmit}>
					<InputForm
						containerClass="form-group"
						textValue={this.state.passwd.title}
						type="password"
						name="passwd"
						inputClass={this.state.passwd.error ? "form-control error" : "form-control"}
						onUpdate={this.updateInputValue}
						errorMessage={this.state.passwd.error}
					/>
					<br />
					<InputForm
						containerClass="form-group"
						textValue={this.state.passwdConfirm.title}
						type="password"
						name="passwdConfirm"
						inputClass={this.state.passwdConfirm.error ? "form-control error" : "form-control"}
						onUpdate={this.updateInputValue}
						errorMessage={this.state.passwdConfirm.error}
					/>
					<br />
					<button className="login-button" type="submit" name="submit" value="submit">
						<FormattedMessage id={'send'} />
					</button>
				</form>
				<br />
				<br /><br />
			</SignInBlock>
		);
	}
}

export default RstPwdPage;