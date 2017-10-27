import React, { Component } from 'react';

class Movieview extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/EgWDYeXDCS4">
                        </iframe>
                    </div>
                </div>
                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <h1> TORRENT </h1>
                </div>
            </div>
        )
    }
}

export default Movieview;