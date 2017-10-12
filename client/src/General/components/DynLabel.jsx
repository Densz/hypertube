import React, { Component } from 'react';
import PropTypes from 'prop-types';


class DynLabel extends Component {
	render() {
		return (
			<label 
				className={ this.props.isEmpty ? 'input-empty' : 'input-filled' }
			>
				{ this.props.textValue }
			</label>
		);
	}
}

DynLabel.PropTypes = {
    isEmpty: PropTypes.string,
    textValue: PropTypes.string
}

export default DynLabel;