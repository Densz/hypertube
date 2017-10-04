import React, { Component } from 'react';
import './form.css';

class LabelComponent extends Component {
	render() {
		return (
			<label className={ this.props.isEmpty ? 'input-empty' : 'input-filled' }>
				{ this.props.value }
			</label>
		);
	}
}

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			passwdEmpty: true,
			passwdConfirmEmpty: true,
		}
	}

	updateInputValue = (evt, name) => {
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
			<h3>Mot de passe oublié</h3>
			<br />
			<form>
				<h4>Mettre à jour son mot de passe</h4>
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
			</form>
			<button className="btn login-button btn-submit btn-lg" type="submit" data-reactid="25">
				Envoyer
			</button>
			<br /><br />
		</div>
		);
	}
}

class ResetPasswd extends Component {
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
		)
	}
}

export default ResetPasswd;
