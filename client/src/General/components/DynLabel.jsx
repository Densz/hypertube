import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class DynLabel extends Component {
	render() {
		return (
			<label 
				className={ this.props.isEmpty ? 'input-empty' : 'input-filled' }
			>
				<FormattedMessage id={ this.props.textValue } />
			</label>
		);
	}
}

DynLabel.PropTypes = {
    isEmpty: PropTypes.string,
    textValue: PropTypes.string
}

export default DynLabel;