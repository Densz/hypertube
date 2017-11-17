import React, { Component } from 'react';

class Moviedescription extends Component {
    render () {
		console.log(this.props.movieInfos);
		let genres = [];
		if (this.props.movieInfos.genres !== undefined) {
			this.props.movieInfos.genres.map((item, index) => {
				genres.push(item.name + ' ');
				return undefined
			})
		}
        
        return (
            <div className="row movie-details-block">
				{ this.props.movieInfos.genres &&
					<div>
						<div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
							<p>Genre : {genres}</p>
							<p>Budget : {this.props.movieInfos.revenue + ' $'}</p>
							<p>Overview : {this.props.movieInfos.overview}</p>
							<p>Release : {this.props.movieInfos.release_date}</p>
							<p>Note : {this.props.movieInfos.vote_average} ({this.props.movieInfos.vote_count} Votes)</p>
						</div>
						<div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
							<img alt={this.props.movieInfos.original_title} className="img-fluid img-thumbnail" src={"http://image.tmdb.org/t/p/original" + this.props.movieInfos.poster_path} />
						</div>
					</div>
				}
            </div>
        )
    }
}

export default Moviedescription;