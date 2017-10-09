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
			emailEmpty: true,
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
				<div className="form-row">
					<div className="row">
						<div className="form-group col-md-12">
							<input type="email" className="form-control form-signUp" onChange={ (evt) => this.updateInputValue(evt, "email") }/>
							<LabelComponent value="Adresse email" isEmpty={ this.state.emailEmpty } />
						</div>
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

class ForgottenPasswd extends Component {
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

export default ForgottenPasswd;
