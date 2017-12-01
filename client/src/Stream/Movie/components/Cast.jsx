import React, { Component } from 'react';
import { callApi } from '../../../ApiCaller/apiCaller';
import CastItem from './CastItem';

class Cast extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cast: {},
			crew: {},
			buttonSelected: "Casting"
		}
		this.switchPeople = this.switchPeople.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		callApi("/api/movie/getPeople", "post", {id: nextProps.id, categorie: nextProps.categorie})
		.then((response) => {
			if (response.result === null) {
				this.setState({
					cast: undefined,
					crew: undefined
				})
			} else {
				this.setState({
					cast: response.cast,
					crew: response.crew
				})
			}
		})
	}

	switchPeople(e) {
		let string = e.target.innerHTML;
		this.setState({
			buttonSelected: string
		})
	}

	render() {
		let castItem = [];
		if (this.state.cast && this.state.cast.length > 0 && this.state.buttonSelected === "Casting") {
			this.state.cast.map((element, index)=> {
				if (index > 0 ){
					castItem.push(<hr className="hr_cast_item" key={"hr." + index} />);
				}
				castItem.push(<CastItem cast={element} key={index} />);
				return undefined;
			})
		} else if (this.state.crew && this.state.crew.length > 0 && this.state.buttonSelected === "Staff") {
			this.state.crew.map((element, index)=> {
				if (index > 0 ){
					castItem.push(<hr className="hr_cast_item" key={"hr." + index} />);
				}
				castItem.push(<CastItem crew={element} key={index} />);
				return undefined;
			})
		} else {
			castItem.push(<h6 key={0}>Cast and crew not found</h6>);
		}

		return(
			<div className="row comment-block">
				<div className="col-md-12">
					<h3>
						<div onClick={this.switchPeople} className={this.state.buttonSelected === "Casting" ? "cast-button selected-people" : "cast-button"}>Casting</div>
						<div onClick={this.switchPeople} className={this.state.buttonSelected === "Staff" ? "cast-button staff selected-people" : "cast-button staff"}>Staff</div>
					</h3>
					<div className="cast-box">
						{ castItem }	
					</div>
				</div>
			</div>
		)
	}
}

export default Cast;