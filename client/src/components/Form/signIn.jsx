import React, { Component } from 'react';
import './form.css';

class Form extends Component {
  render() {
    return (
      <div>
        <h3>S'identifier</h3>
        <br />
        <form>
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" />
          </div>
          <br/>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" className="form-control" name="password" />
          </div>
        </form>
        <br /><br />
        <a href="/forgottenPasswd">Mot de passe oublié ?</a>
        <br /><br />
        <button className="btn login-button btn-submit btn-small" type="submit" data-reactid="25">
          S'identifier
        </button>
        <br /><br />
        <hr />
        <img src="/images/facebook.png" className="facebook-logo" alt="Facebook" />&nbsp;&nbsp;<a href="/loginWithFacebook">S'identifier avec Facebook ?</a>
        <p>Première visite sur Hypertube ? <a href="/SignUp">Inscrivez-vous</a>.</p>
        
      </div>
    );
  }
}

class SignIn extends Component {
	constructor(props) {
		super(props);
		let bodyStyle = document.body.style;
		bodyStyle.backgroundColor = 'black';
		bodyStyle.backgroundSize = 'cover';
		bodyStyle.backgroundImage = 'url("/images/narcos.jpg")';
    bodyStyle.backgroundRepeat = 'no-repeat';
	}
	render() {
		return (
		<div className="row">
			<div className="col-sm-4"></div>
			  <div className="col-sm-4 form-box">
			   <Form />
		  	</div>
			<div className="col-sm-4"></div>
		</div>
		);
	}
}

export default SignIn;
