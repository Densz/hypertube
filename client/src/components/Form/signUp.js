import React, { Component } from 'react';
import './form.css';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailEmpty: true,
			passwdEmpty: true,
			loginEmpty: true,
			passwdConfirmEmpty: true
		}
	}

	updateInputEmailValue = (evt) => {
		if (evt.target.value) {
			this.setState({
				emailEmpty: false
			});
		} else {
			this.setState({
				emailEmpty: true
			});
		}
	};

	updateInputPwdValue = (evt) => {
		if (evt.target.value) {
			this.setState({
				passwdEmpty: false
			});
		} else {
			this.setState({
				passwdEmpty: true
			});
		}
	};

	updateInputConfirmPwdValue = (evt) => {
		if (evt.target.value) {
			this.setState({
				passwdConfirmEmpty: false
			});
		} else {
			this.setState({
				passwdConfirmEmpty: true
			});
		}
	};

	updateInputLoginValue = (evt) => {
		if (evt.target.value) {
			this.setState({
				loginEmpty: false
			});
		} else {
			this.setState({
				loginEmpty: true
			});
		}
	};

	render() {
		return (
		<div>
			<h3>Inscrivez-vous pour profitez de vos films et séries préférées</h3>
			<br />
			<form>
				<h4>Créez votre compte</h4>
				<div className="form-row"> 
					<div className="form-group col-md-6">
						<input type="email" className="form-control form-signUp" onChange={ evt => this.updateInputEmailValue(evt) }/>
						<LabelComponent value="Adresse email" isEmpty={ this.state.emailEmpty } />
					</div>
					<div className="form-group col-md-6">
						<input type="text" className="form-control form-signUp" onChange={ evt => this.updateInputLoginValue(evt) }/>
						<LabelComponent value="Login" isEmpty={ this.state.loginEmpty } />
					</div>
					<div className="form-group col-md-6">
						<input type="password" className="form-control form-signUp" onChange={ evt => this.updateInputPwdValue(evt) }/>				
						<LabelComponent value="Mot de passe" isEmpty={ this.state.passwdEmpty }/>
					</div>
					<div className="form-group col-md-6">
						<input type="password" className="form-control form-signUp" onChange={ evt => this.updateInputConfirmPwdValue(evt) }/>				
						<LabelComponent value="Confirmer votre mot de passe" isEmpty={ this.state.passwdConfirmEmpty }/>
					</div>
				</div>
			</form>
			<button className="btn login-button btn-submit btn-small" type="submit" data-reactid="25">
				Créer son compte
			</button>
			<br /><br />
			<hr />
			<img src="/images/facebook.png" className="facebook-logo" alt="Facebook" />&nbsp;&nbsp;<a href="/loginWithFacebook">S'identifier avec Facebook ?</a>
			
		</div>
		);
	}



}

class LabelComponent extends Component {
	render() {
		return (
			<label 
				className={ this.props.isEmpty ? 'input-empty' : 'input-filled' }
			>
				{ this.props.value }
			</label>
		);
	}
}

class SignUp extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12 form-box">
			<div className="col-sm-3"></div>
			<div className="col-sm-6">
				<Form />
			</div>
			<div className="col-sm-3"></div>			
        </div>
      </div>
    );
  }
}

export default SignUp;
