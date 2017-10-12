import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignUpBlock extends Component {
    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        );
    }
}

SignUpBlock.propTypes = {
	children: PropTypes.any
}

export default SignUpBlock;