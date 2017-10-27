import React, { Component } from 'react';

class Moviedescription extends Component {
    render () {
        let genres = [];
        this.props.states.genres.map((item, index) => {
            genres.push(item.name + ' ');
            return undefined
        })
        
        return (
            <div className="row">
                <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                   Genre : {genres}
                   Budget : {this.props.states.budget + ' $'}
                   Overview : {this.props.states.description}
                   Release : {this.props.states.release_date}
                   Note : {this.props.states.vote_average} ({this.props.states.vote_count} Vote(s))
                </div>
                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <img className="img-fluid img-thumbnail" src={"http://image.tmdb.org/t/p/original" + this.props.states.poster} />
                </div>
            </div>
        )
    }
}

export default Moviedescription;