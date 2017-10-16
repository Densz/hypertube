import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignInBlock extends Component {
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

SignInBlock.propTypes = {
	children: PropTypes.any
}

export default SignInBlock;