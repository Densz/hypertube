import React, { Component } from "react";
import InputForm from "../../General/components/InputForm";
import "../css/signin.css";
import SignInBlock from "./SignInBlock";
import PropTypes from 'prop-types';

const SignInForm = (props) => {    
    return(
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
            <a onClick={props.linkClicked}>Mot de passe oublié ?</a>
            <br/><br/>
            <button className="login-button" type="submit" data-reactid="25">
                S'identifier
            </button>
            <br/><br/>
            <hr/>
            <img src="/images/facebook.png" className="facebook-logo" alt="Facebook" />&nbsp;&nbsp;<a href="/loginWithFacebook">S'identifier avec Facebook ?</a>
            <p>Première visite sur Hypertube ? <a href="/signUp">Inscrivez-vous</a>.</p>
        </SignInBlock>
    );
}

const RstPwdForm = (props) => {
    return(
        <SignInBlock>
            <h3>Mot de passe oublié</h3>
            <form>
                <InputForm
                    containerClass="form-group"
                    textValue="E-mail"
                    type="email"
                    inputClass="form-control"
                />
            </form>
            <br/>
            <a onClick={props.linkClicked}>Connectez-vous</a>
            <br/><br/>
            <button className="login-button" type="submit">
                Envoyer
            </button>
        </SignInBlock>
    );
}

const ComponentRendered = (props) => {
    const handleRender = props.stateRender;
    const handleRstPwd = props.handleRender;

    if (handleRender) {
        return <RstPwdForm linkClicked={handleRstPwd}/>
    } else {
        return <SignInForm linkClicked={handleRstPwd}/>
    }

}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resetPassword: false,
        };
        this.handleRstPwd = this.handleRstPwd.bind(this);
    }

    handleRstPwd() {
        this.setState({resetPassword: !this.state.resetPassword});
    }

    componentDidMount() {
        let bodyStyle = document.body.style;

        bodyStyle.backgroundImage = 'url("/images/narcos.jpg")';
        bodyStyle.backgroundRepeat = 'no-repeat';
        bodyStyle.backgroundSize = 'cover';
    }
    
    render() {
        return (
            <ComponentRendered handleRender={this.handleRstPwd} stateRender={this.state.resetPassword}/>
        );
    }
}

SignIn.propTypes = {
    resetPassword: PropTypes.bool
}

export default SignIn;