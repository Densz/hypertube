import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './form.css';

class Form extends Component {
  render() {
    return (
      <div>
        <h3>
          <FormattedMessage id={'form.signin'} />
        </h3>
        <br />
        <form>
          <div className="form-group">
            <label>
              <FormattedMessage id={'form.email'} />
            </label>
            <input type="email" className="form-control" aria-describedby="emailHelp" />
          </div>
          <br/>
          <div className="form-group">
            <label>
              <FormattedMessage id={'form.passwd'} />
            </label>
            <input type="password" className="form-control" name="password" />
          </div>
        </form>
        <br /><br />
        <a href="/forgottenPasswd"><FormattedMessage id={ 'form.forgottenpasswd' } /></a>
        <br /><br />
        <button className="btn login-button btn-submit btn-small" type="submit" data-reactid="25">
          <FormattedMessage id={ 'form.signin' } />
        </button>
        <br /><br />
        <hr />
        <img src="/images/facebook.png" className="facebook-logo" alt="Facebook" />&nbsp;&nbsp;<a href="/loginWithFacebook"><FormattedMessage id={'form.signupwithfacebook'} /></a>
        <p><FormattedMessage id={ 'form.firstvisite' } /> <a href="/SignUp"><FormattedMessage id={'form.signup'} /></a>.</p>
        
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
