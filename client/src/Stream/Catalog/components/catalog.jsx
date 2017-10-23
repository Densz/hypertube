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
			pages: 0,
		}
	}

	componentDidMount() {
		const bodyStyle = document.body.style;
		bodyStyle.backgroundColor = '#20232a';
		// callApi('/api/catalog/')
		// .then((catalogMovies) => {
		// 	this.setState({
		// 		catalog: catalogMovies.data.movies,
		// 		pages: Math.floor(catalogMovies.data.movie_count / 16),
		// 		currentPage: 1
		// 	})
		// })
	}

	callMoreMovies() {
		callApi('/api/catalog/', 'post', { pages: this.state.pages })
		.then((catalogMovies) => {
			//let catalogArray = this.state.catalog;
			this.setState((prevState) => ({
				catalog: catalogMovies.data.movies,
				pages: prevState.pages + 1
			}))
		})
	}

	render() {
		let items = [];
		this.state.catalog.map((movieData, index) => {
			items.push(<Thumbnail key={index} infos={movieData} />);
			return items;
		})

		return (
			<div className="row">
				<InfiniteScroll
					pageStart={0}
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