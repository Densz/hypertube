import React, { Component } from 'react';

class Moviedescription extends Component {
    render () {
        let genres = [];
        this.props.states.genres.map((item, index) => {
            genres.push(item.name + ' ');
            return undefined
        })
        
        return (
            <div className="row movie-details-block">
                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                   <p>Genre : {genres}</p>
                   <p>Budget : {this.props.states.budget + ' $'}</p>
                   <p>Overview : {this.props.states.description}</p>
                   <p>Release : {this.props.states.release_date}</p>
                   <p>Note : {this.props.states.vote_average} ({this.props.states.vote_count} Vote(s))</p>
                </div>
                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <img alt="faut mettre une alt sur toute les images" className="img-fluid img-thumbnail" src={"http://image.tmdb.org/t/p/original" + this.props.states.poster} />
                </div>
            </div>
        )
    }
}

export default Moviedescription;