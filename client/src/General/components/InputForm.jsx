import React, { Component } from 'react';
import DynLabel from '../../General/components/DynLabel';
import { FormattedMessage } from 'react-intl';

class InputForm extends Component {
    constructor(props) {
		super(props);
		this.state = {
			textEmpty: true,
        }
        this.updateInputValue = this.updateInputValue.bind(this);
	}

	componentDidMount() {
		if (this.props.value !== undefined && this.props.value !== '') {
			this.setState({
				textEmpty: false,
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== undefined && nextProps.value !== '') {
			this.setState({
				textEmpty: false
			});
		}
	}

    updateInputValue = (evt) => {
		evt.preventDefault();
		if (evt.target.value) {
			this.setState({
				textEmpty: false,
			});
		} else {
			this.setState({
				textEmpty: true,
			});
		}
		this.props.onUpdate(this.props.name, evt.target.value);
	};

    render() {
        return (
            <div className={this.props.containerClass}>
                <DynLabel 
                    isEmpty={this.state.textEmpty}
                    textValue={this.props.textValue}
                />
                <input
					name={this.props.name}
					type={this.props.type}
					value={this.props.value}
                    className={this.props.inputClass}
                    onChange={this.updateInputValue}
                />
				{this.props.errorMessage !== '' &&
				<span className="form-error-message"><FormattedMessage id={this.props.errorMessage} /></span>}
            </div>
        );
    }
}

export default InputForm;