import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

class ProfileItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false,
			value: this.props.item.value,
			tmpValue : this.props.item.value
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput = (event) => {
		event.preventDefault();
		this.setState({
			tmpValue: event.target.value
		});
	};

	handleClick = () => {
		console.log("setting active");
		this.setState({
			isActive: true
		});
	};

	handleSubmit(event){
		event.preventDefault();
		console.log('handle submit');
		if (this.props.submitData(this.props.name, this.state.tmpValue)) {
			this.setState({value : this.state.tmpValue});
		} else {
			this.setState({tmpValue: this.state.value});
		}
		this.setState({
			isActive: false
		});
	};

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
						<input autoFocus className="form-control" name={this.props.name} onChange={this.handleInput} type={this.props.type} value={this.state.tmpValue} placeholder={this.props.item.title} />
						<span className="input-group-btn">
							<button onClick={this.handleSubmit} className="btn" type="submit">Change {this.props.item.title}</button>
						</span>
						{this.props.item.error !== '' && <span className="form-error-message">{this.props.item.error}</span>}
					</div>
				</div>
			</div>
		) : (
				<div>
					<div className="col-md-12" onClick={this.handleClick}>
						<div className="text-left" data-tip="Click to change">{this.state.value}</div>
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