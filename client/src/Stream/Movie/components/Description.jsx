import React, { Component } from 'react';

class Description extends Component {
    render () {
		let genres = [];
		if (this.props.movie.genre !== undefined) {
			this.props.movie.genre.map((item, index) => {
				if (index > 0)
					genres.push(' / ' + item);
				else 
					genres.push(item);
				return undefined;
			})
		}
        return (
			<div className="col-md-8">
				<div className="col-md-5 coverImg">
					<img src={this.props.movie.cover_url} alt={this.props.movie.title}/>
				</div>
				<div className="col-md-7">
					<h1> { this.props.movie.title } </h1>
					<p className="GenreStyle">{genres}</p>
					<h3> {this.props.movie.year }</h3>
					_
					<br/>
					<br/>
					<p>{ this.props.movie.overview }</p>
					<p className="imdb_rating"><img alt="imdb_logo" className="imdb-logo" src="/images/imdb.png"/>&nbsp;&nbsp;{this.props.movie.imdb_rating}</p>
				</div>
			</div>
        )
    }
}

export default Description;