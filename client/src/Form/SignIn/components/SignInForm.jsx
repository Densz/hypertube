import React, { Component } from 'react';
import SignInBlock from "./SignInBlock";
import InputForm from "../../../General/components/InputForm";
import { callApi } from '../../../ApiCaller/apiCaller';
import { FormattedMessage } from 'react-intl';

class SignInForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: {intlId: 'form.login', value: '', error: ''},
			passwd: {intlId: 'form.passwd', value: '', error: ''},
			loginDone: false,
			rstPwdDone: false
		};
		this.updateInputValue = this.updateInputValue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({	rstPwdDone: this.props.rstPwdDone });
	}

	updateInputValue = (key, value) => {			
		this.setState((prevState) => ({
			[key]: {
				intlId: prevState[key].intlId,
				value: value,
				error: ''
			}
		}))
	}

	setErrorMessage = (elem, errorMessage) => {
		this.setState((prevState) => ({
			[elem]: {
				intlId: prevState[elem].intlId,
				value: prevState[elem].value,
				error: errorMessage
			}
		}))
	}

	handleSubmit(event) {
        event.preventDefault();
        const inputValues = {
            username: this.state.login.value,
            password: this.state.passwd.value,
		}
		let errorBool = false;
        for (var elem in this.state) {
            if (this.state[elem].intlId !== undefined && (this.state[elem].value === '' || this.state[elem].value === undefined)) {
					this.setErrorMessage(elem, this.state[elem].intlId + ".isMissing");
				errorBool = true;
			}
		}
		if (!errorBool)
			callApi('/api/login', 'post', inputValues)
			.then((response) => {
				if (response.message) {
					if (response.message.search('username') > 0) {
						this.setState({
							login: {
								...this.state.login,
								error: "error.login.invalid"
							},
							passwd: {
								...this.state.passwd,
								error: ""
							}
						})
					} else {
						this.setState({
							login: {
								...this.state.login,
								error: ""
							},
							passwd: {
								...this.state.passwd,
								error: "error.password.incorrect"
							}
						})
					}
				}
				this.props.checkIfIsLogged();
			})
	}

	render() {
		return(
			<SignInBlock>
				<h3><FormattedMessage id={'form.signin'}/></h3>
			{this.state.rstPwdDone &&
				<div className="alert alert-info">
					<FormattedMessage id={'info.passwd.updated'} />
				</div>}
            <form>
                <InputForm
                    containerClass="form-group"
                    textValue={ this.state.login.intlId }
                    type="text"
					inputClass={ this.state.login.error ? "form-control error" : "form-control" }
					name="login"
					onUpdate={ this.updateInputValue }
					errorMessage={ this.state.login.error }
                />
                <InputForm
                    containerClass="form-group"
					textValue={ this.state.passwd.intlId }
                    type="password"
					inputClass={ this.state.passwd.error ? "form-control error" : "form-control" }
					name="passwd"
					onUpdate={ this.updateInputValue }
					errorMessage={ this.state.passwd.error }
                />
				<br/>
				<button className="login-button" onClick={this.handleSubmit} name="submit" value="submit" type="submit" data-reactid="25">
					<FormattedMessage id={'form.signin'} />
				</button>
            </form>
            <br/><br/>
            <a className="link-reset-password" onClick={this.props.linkClicked}>
				<FormattedMessage id={'form.forgottenpasswd'} />
			</a>
            <br/><br/>
            <hr/>
            <img src="/images/facebook.png" className="oAuth-logo" alt="Facebook" />&nbsp;&nbsp;
			<a className="oAuth-text" href="http://localhost:3001/api/login/facebook">
				<FormattedMessage id={'form.signupwithfacebook'} />
			</a><br/>
            <img src="/images/42.png" className="oAuth-logo" alt="42" />&nbsp;&nbsp;
			<a className="oAuth-text" href="http://localhost:3001/api/login/fortytwo">
				<FormattedMessage id={'form.signupwithfortytwo'} />
			</a><br/>
            <img src="/images/github.png" className="oAuth-logo" alt="42" />&nbsp;&nbsp;
			<a className="oAuth-text" href="http://localhost:3001/api/login/github">
				<FormattedMessage id={'form.signupwithgithub'} />
			</a><br/>
			<img src="/images/google.png" className="oAuth-logo" alt="google" />&nbsp;&nbsp;
			<a href="http://localhost:3001/api/login/google" className="oAuth-text">
				<FormattedMessage id={'form.signupwithgoogle'} />
			</a><br/>
			<img src="/images/kappa.png" alt="twich" className="oAuth-logo"/>&nbsp;&nbsp;
			<a href="http://localhost:3001/api/login/twitch" className="oAuth-text">
				<FormattedMessage id={'form.signupwithtwitch'} />
			</a>
			<hr/>
            <p>
				<FormattedMessage id={'form.firstvisit'} /><br />
				<a href="/signUp">
					<FormattedMessage id={'form.signup'} />					
				</a>.
			</p>
        	</SignInBlock>
		)
	}
}

export default SignInForm;