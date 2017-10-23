import React, { Component } from 'react';
import Thumbnail from './thumbnail';
import callApi from '../../../ApiCaller/apiCaller';
import '../css/catalog.css';
import InfiniteScroll from 'react-infinite-scroller';

class Catalog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			catalog: [],
			pages: 1,
		}
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';
	}

	callMoreMovies() {
		callApi('/api/catalog/', 'post', { pages: this.state.pages })
		.then((catalogMovies) => {
			let catalogArray = this.state.catalog;
			catalogMovies.data.movies.map(
				(movieData) => {
					catalogArray.push(movieData);
					return undefined;
				}
			);
			this.setState((prevState) => ({
				catalog: catalogArray,
				pages: prevState.pages + 1
			}))
		})
	}

	render() {
		let items = [];
		this.state.catalog.map((movieData, index) => {
			items.push(<Thumbnail key={index} infos={movieData} />);
			return undefined;
		})

		return (
			<div className="row">
				<InfiniteScroll
					loadMore={this.callMoreMovies.bind(this)}
					hasMore={true}
					loader={<div className="loader">Loading ...</div>}
				>
					{items}
				</InfiniteScroll>
			</div>
		);
	}
}

export default Catalog;