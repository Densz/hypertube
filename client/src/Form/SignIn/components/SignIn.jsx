import React, { Component } from "react";
import "../css/signin.css";
import PropTypes from 'prop-types';
import SignInForm from "./SignInForm";
import RstPwdForm from "./RstPwdForm";

const ComponentRendered = (props) => {
    const handleRender = props.stateRender;
    const handleRstPwd = props.handleRender;

    if (handleRender) {
		return <RstPwdForm linkClicked={ handleRstPwd } />
    } else {
		return <SignInForm linkClicked={ handleRstPwd } checkIfIsLogged={props.checkIfIsLogged} />
    }

}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
			resetPassword: false
		};
        this.handleRstPwd = this.handleRstPwd.bind(this);
    }

    handleRstPwd() {
        this.setState((prevState) => ({
            resetPassword: !prevState.resetPassword
        }));
    }

    componentDidMount() {
        let bodyStyle = document.body.style;

        bodyStyle.backgroundImage = 'url("/images/narcos.jpg")';
        bodyStyle.backgroundRepeat = 'no-repeat';
        bodyStyle.backgroundColor = 'black';
        bodyStyle.backgroundSize = 'cover';
    }
	
	componentWillUnmount() {
		let bodyStyle = document.body.style;

        bodyStyle.backgroundImage = '';
        bodyStyle.backgroundRepeat = '';
        bodyStyle.backgroundColor = '';
        bodyStyle.backgroundSize = '';
	}

    render() {
        return (
            <ComponentRendered
				handleRender={this.handleRstPwd} 
				stateRender={this.state.resetPassword}
				checkIfIsLogged={this.props.checkIfIsLogged}
			/>
        );
    }
}

SignIn.propTypes = {
    resetPassword: PropTypes.bool
}

export default SignIn;