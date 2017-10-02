import React, { Component } from 'react';
import './form.css';

class Signin extends Component {
  render() {
    return (
      <div>
        <h3>S'identifier</h3>
        <br />
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">E-mail</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Mot de passe</label>
            <input type="password" className="form-control" name="password" />
          </div>
        </form>
        <br /><br />
        <a href="/forgottenPassword">Mot de passe oublié ?</a>
        <br /><br />
        <button className="btn login-button btn-submit btn-small" type="submit" autocomplete="off" tabindex="4" data-reactid="25">
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

class Form extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6 form-box">
          {/* Routes */}
          <Signin />
        </div>
        <div className="col-sm-3"></div>
      </div>
    );
  }
}

export default Form;
