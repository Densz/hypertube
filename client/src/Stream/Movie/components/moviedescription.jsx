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
						<div className="col-md-3 coverImg">
							<img alt={this.props.movieInfos.original_title} className="img-fluid img-thumbnail" src={"http://image.tmdb.org/t/p/original" + this.props.movieInfos.poster_path} />
						</div>
						<div className="col-md-4">
							<h1> {this.props.movieInfos.original_title} </h1>
							<p className="GenreStyle">{genres}</p>
							_
							<br/>
							<br/>
							<p>Budget : {this.props.movieInfos.revenue + ' $'}</p>
							<p>Overview : {this.props.movieInfos.overview}</p>
							<p>Release : {this.props.movieInfos.release_date}</p>
							<p>Note : {this.props.movieInfos.vote_average} ({this.props.movieInfos.vote_count} Votes)</p>
						</div>
						<div className="col-md-5">
							<h3 id="available">Available in :</h3>
							<div className="links_available"></div>
						</div>
					</div>
				}
            </div>
        )
    }
}

export default Moviedescription;