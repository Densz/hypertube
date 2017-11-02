import React, { Component } from 'react';

class Movieview extends Component {
    render() {
        return (
            <div className="embed-responsive embed-responsive-16by9">
                <iframe title="a fixer" className="embed-responsive-item" src="https://www.youtube.com/embed/EgWDYeXDCS4">
                </iframe>
            </div>
        )
    }
}

export default Movieview;