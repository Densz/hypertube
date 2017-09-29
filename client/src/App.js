import React, { Component } from 'react';
import './App.css';

class Form extends Component {
  render() {
    return (
      <div>
        <h3>S'identifier</h3>
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">E-mail</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" />
            <small id="emailHelp" className="form-text text-muted">Nous garderons votre addresse email</small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Mot de passe</label>
            <input type="password" className="form-control" name="password" />
          </div>
        </form>
        <br /><br /><br /><br />
        <a href="/forgottenPassword">Mot de passe oublié ?</a>
        <button className="btn login-button btn-submit btn-small" type="submit" autocomplete="off" tabindex="4" data-reactid="25">
          S'identifier
        </button>
        <hr />
        <a href="/loginWithFacebook">S'identifier avec Facebook ?</a>
        <p>Première visite sur Hypertube ? <a href="/SignUp">Inscrivez-vous</a>.</p>
        
      </div>
    );
  }
}

class App extends Component {
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

export default App;
