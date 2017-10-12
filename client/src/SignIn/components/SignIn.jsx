import React, { Component } from "react";
import InputForm from "../../General/components/InputForm";
import "../css/signin.css";
import SignInBlock from "./SignInBlock";

class SignIn extends Component {
    componentDidMount() {
        console.log('component DID Mount');
        let bodyStyle = document.body.style;

        bodyStyle.backgroundImage = 'url("/images/narcos.jpg")';
        bodyStyle.backgroundRepeat = 'no-repeat';
        bodyStyle.backgroundSize = 'cover';
    }
    
    render() {
        return (
            <SignInBlock>
                <h3>S'identifier</h3>
                <form>
                    <InputForm
                        containerClass="form-group"
                        textValue="E-mail"
                        type="email"
                        inputClass="form-control"
                    />
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
                <button className="login-button" type="submit" data-reactid="25">
                    S'identifier
                </button>
                <br/><br/>
                <hr/>
                <img src="/images/facebook.png" className="facebook-logo" alt="Facebook" />&nbsp;&nbsp;<a href="/loginWithFacebook">S'identifier avec Facebook ?</a>
                <p>Première visite sur Hypertube ? <a href="/SignUp">Inscrivez-vous</a>.</p>
        
            </SignInBlock>
        );
    }
}

export default SignIn;