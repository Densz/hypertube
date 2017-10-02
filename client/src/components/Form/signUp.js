import React, { Component } from 'react';
import './form.css';

class Form extends Component {
  render() {
    return (
      <div>
        <h3>Inscrivez-vous pour profitez de vos films et séries préférées</h3>
        <br />
        <form>
        <h4>Créez votre compte</h4>
          <div className="form-group">
            <input type="email" className="form-control form-signUp"/>
            <label className="form-label-signUp">Adresse email</label>
            <small id="emailHelp" class="form-text text-muted">Nous ne partagerons jamais votre adresse email avec qui que ce soit.</small>
          </div>
          <br />
          <div className="form-group">
            <input type="password" className="form-control form-signUp"/>
            <label className="form-label-signUp">Mot de passe</label>
          </div>
          {/* <div className="form-group-lg">
            <input type="password" className="form-control form-signUp" name="password"/>
            <label className="form-label-signUp">Mot de passe</label>
          </div> */}
        </form>
        <br /><br />
        <a href="/forgottenPassword">Mot de passe oublié ?</a>
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

class SignUp extends Component {
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

export default SignUp;
