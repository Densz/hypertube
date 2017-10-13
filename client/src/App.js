import React, { Component } from 'react';
import './index.css';

import Routes from './routes';

class App extends Component {
    render() {
        return (
            <div>
                <Routes changeLngToFr={ this.props.changeLngToFr } changeLngToEn={ this.props.changeLngToEn } />
            </div>
        );
    }
}

export default App;
