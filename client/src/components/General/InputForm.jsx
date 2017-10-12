import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputForm extends Component {
    render() {
        return (
            <div className={this.props.containerClass}>
                <label>{this.props.textValue}</label>
                <input
                    type={this.props.type}
                    className={this.props.inputClass}
                />
            </div>
        );
    }
}

InputForm.propTypes = {
    containerClass: PropTypes.string,
    textValue: PropTypes.string,
    type: PropTypes.string,
    inputClass: PropTypes.string
}

export default InputForm;