import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignInContainer extends Component {
    render() {
        return (
			<div className="row">
				<div className="col-sm-4"></div>
					<div className="col-sm-4 form-box">
						{this.props.children}
					</div>
				<div className="col-sm-4"></div>
			</div>
        );
    }
}

SignInContainer.propTypes = {
	children: PropTypes.any
}

export default SignInContainer;