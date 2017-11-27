import React, { Component } from "react";
import "../css/signin.css";
import PropTypes from 'prop-types';
import SignInForm from "./SignInForm";
import RstPwdForm from "./RstPwdForm";
import { callApi } from "../../../ApiCaller/apiCaller"
import RstPwdPage from "./RstPwdPage";

const ComponentRendered = (props) => {
	const handleRenderForm = props.stateRender.resetPassword;
	const handleRenderPage = props.stateRender.rstPwdPage;
    const handleRstPwd = props.handleRender;
	const idResetPassword = props.idResetPassword;

	if (handleRenderPage) {
		return <RstPwdPage idResetPassword={idResetPassword} handleRstDone={props.handleRstDone}/>
	}
    if (handleRenderForm) {
		return <RstPwdForm linkClicked={handleRstPwd} />
    } else {
		return <SignInForm linkClicked={ handleRstPwd } checkIfIsLogged={props.checkIfIsLogged} />
    }

}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
			resetPassword: false,
			rstPwdPage: false
		};
		this.handleRstPwd = this.handleRstPwd.bind(this);
		this.handleRstDone = this.handleRstDone.bind(this);
    }

    handleRstPwd() {
        this.setState((prevState) => ({
            resetPassword: !prevState.resetPassword
        }));
	}
	
	handleRstDone() {
		console.log(this.state);
		this.setState({ resetPassword: false, rstPwdPage: false });
	}

    componentDidMount() {
        let bodyStyle = document.body.style;

        bodyStyle.backgroundImage = 'url("/images/narcos.jpg")';
        bodyStyle.backgroundRepeat = 'no-repeat';
        bodyStyle.backgroundColor = 'black';
		bodyStyle.backgroundSize = 'cover';
		if (this.props.idResetPassword !== undefined) {
			callApi('/api/userLogged/userExists?id=' + this.props.idResetPassword)
			.then((response) => {
				if (response.success) {
					this.setState({ rstPwdPage: true });
				}
			})
		}
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
				stateRender={this.state}
				checkIfIsLogged={this.props.checkIfIsLogged}
				idResetPassword={this.props.idResetPassword}
				handleRstDone={this.handleRstDone}
			/>
        );
    }
}

SignIn.propTypes = {
    resetPassword: PropTypes.bool
}

export default SignIn;