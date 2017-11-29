import React, { Component } from 'react';
import { callApi } from '../../../ApiCaller/apiCaller';
import CastItem from './CastItem';

class Cast extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cast: {},
			crew: {}
		}
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

	render() {
		let castItem = [];
		if (this.state.cast && this.state.cast.length > 0) {
			this.state.cast.map((element, index)=> {
				castItem.push(<CastItem cast={element}/>);
				castItem.push(<hr className="hr_cast_item"/>);
				return undefined;
			})
		}

		return(
			<div className="row comment-block">
				<div className="col-md-12">
					<h3>Casting</h3>
					<div className="cast-box">
						{ castItem }	
						
					</div>
				</div>
			</div>
		)
	}
}

export default Cast;