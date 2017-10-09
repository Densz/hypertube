import React, { Component } from 'react';
import './form.css';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailEmpty: true,
			passwdEmpty: true,
			loginEmpty: true,
			passwdConfirmEmpty: true,
			firstNameEmpty: true,
			lastNameEmpty: true,
		}
	}

	updateInputValue = (evt, name) => {
		evt.preventDefault();
		if (evt.target.value) {
			this.setState({
				[name + "Empty"]: false,
			});
		} else {
			this.setState({
				[name + "Empty"]: true,
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
					<div className="row">
						<div className="form-group col-md-12">
							<input type="email" className="form-control form-signUp" onChange={ (evt) => this.updateInputValue(evt, "email") }/>
							<LabelComponent value="Adresse email" isEmpty={ this.state.emailEmpty } />
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-4">
							<input type="text" className="form-control form-signUp" onChange={ (evt) => this.updateInputValue(evt, "login") }/>
							<LabelComponent value="Login" isEmpty={ this.state.loginEmpty } />
						</div>
						<div className="form-group col-md-4">
							<input type="text" className="form-control form-signUp" onChange={ (evt) => this.updateInputValue(evt, "firstName") }/>
							<LabelComponent value="Prénom" isEmpty={ this.state.firstNameEmpty } />
						</div>
						<div className="form-group col-md-4">
							<input type="text" className="form-control form-signUp" onChange={ (evt) => this.updateInputValue(evt, "lastName") }/>
							<LabelComponent value="Nom" isEmpty={ this.state.lastNameEmpty } />
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-6">
							<input type="password" className="form-control form-signUp" onChange={ (evt) => this.updateInputValue(evt, "passwd") }/>				
							<LabelComponent value="Mot de passe" isEmpty={ this.state.passwdEmpty }/>
						</div>
						<div className="form-group col-md-6">
							<input type="password" className="form-control form-signUp" onChange={ (evt) => this.updateInputValue(evt, "passwdConfirm") }/>				
							<LabelComponent value="Confirmer votre mot de passe" isEmpty={ this.state.passwdConfirmEmpty }/>
						</div>
					</div>
				</div>
			</form>
			<button className="btn login-button btn-submit btn-lg" type="submit" data-reactid="25">
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
	constructor(props) {
		super(props);
		document.body.style.backgroundColor = "#f3f3f3";
	}
	render() {
		return (
			<div className="row">
				<div className="col-sm-3"></div>
					<div className="col-sm-6">
						<Form />
					</div>
				<div className="col-sm-3"></div>			
			</div>
		);
	}
}

export default SignUp;
