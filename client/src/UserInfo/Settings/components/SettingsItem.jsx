import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { FormattedMessage } from "react-intl";

class ProfileItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false,
			value: this.props.item.value,
			tmpValue : this.props.item.value,
			type: { password: false, value: '' }
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput = (event) => {
		event.preventDefault();
		this.setState({
			tmpValue: event.target.value,
		});
		this.props.item.error = ''
	};

	handleClick = () => {
		console.log("setting active");
		this.setState({
			isActive: true
		});
	};

	async handleSubmit(event){
		event.preventDefault();
		const ret = await this.props.submitData(this.props.name, this.state.tmpValue);
		console.log(ret);
		if (ret.success === true) {
			let capValue = '';
			if (this.props.name === 'firstName' || this.props.name === 'lastName') {
				capValue = this.props.capitalize(this.state.tmpValue);
			} else {
				capValue = this.state.tmpValue;
			}
			if (this.props.name === 'passwd') {
				const starValue  = '*'.repeat(capValue.length);
				console.log(starValue);
				setTimeout(() => {
					this.setState({ value: starValue, tmpValue: starValue })
				}, 3000);
			}
			this.setState({value : capValue, tmpValue: capValue});
		} else {
			this.setState({tmpValue: this.state.value});
		}
		this.setState({
			isActive: false
		});
	};

	componentDidMount() {
		if (this.props.type === 'password') {
			this.setState({type: { password: true, value: 'text' } });
		} else {
			this.setState({type: { password: false, value: this.props.type } });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.item.value !== this.props.item.value){
			this.setState({ value: nextProps.item.value, tmpValue: nextProps.item.value });
		}
	}

	render() {
		let component = this.state.isActive ? (
			<div>
				<div className="col-md-12" tabIndex="1" >
					<div className="input-group">
						<input autoFocus className="form-control" name={this.props.name} onChange={this.handleInput} type={this.state.type.value} value={this.state.tmpValue} />
						<span className="input-group-btn">
							<button onClick={this.handleSubmit} className="btn" type="submit"><FormattedMessage id={'change'} /><FormattedMessage id={this.props.item.title} /></button>
						</span>
					</div>
				</div>
			</div>
		) : (
				<div>
					<div className="col-md-12" onClick={this.handleClick}>
						<label><FormattedMessage id={this.props.title} />{' :'}</label>
						{this.props.item.error && <div className="error-message" ><FormattedMessage id={this.props.item.error} /></div>}
						<div className="text-left text-value" data-tip="Click to change">{this.state.value}</div>
						<ReactTooltip place="right" type="dark" effect="solid" />
					</div>
				</div>
			);

		return (
			<form name={this.props.name} onSubmit={this.handleSubmit}>
				<div className="row form-group align-middle detail-section">
					{component}
				</div>
			</form>
		);
	}
}

export default ProfileItem;