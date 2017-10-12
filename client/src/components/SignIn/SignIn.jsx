import React, { Component } from "react";
import InputForm from "../General/InputForm";
import "../Form/form.css";
import SignInContainer from "./SignInContainer";

class SignIn extends Component {
    render() {
        return (
            <SignInContainer>
                <h3>S'identifier</h3>
                <form>
                    <InputForm
                        containerClass="form-group"
                        textValue="E-mail"
                        type="email"
                        inputClass="form-control"
                    />
                    <br/>
                    <InputForm
                        containerClass="form-group"
                        textValue="Mot de passe"
                        type="password"
                        inputClass="form-control"
                    />
                </form>
                <br/><br/>
                <a href="/forgottenPasswd">Mot de passe oublié ?</a>
                <br/><br/>
                <button className="btn login-button btn-submit btn-small" type="submit" data-reactid="25">
                    S'identifier
                </button>
                <br/><br/>
                <hr/>
                <img src="/images/facebook.png" className="facebook-logo" alt="Facebook" />&nbsp;&nbsp;<a href="/loginWithFacebook">S'identifier avec Facebook ?</a>
                <p>Première visite sur Hypertube ? <a href="/SignUp">Inscrivez-vous</a>.</p>
        
            </SignInContainer>
        );
    }
}

export default SignIn;