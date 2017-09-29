import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Header from './templates/header.js';
import Footer from './templates/footer.js';

class Index extends Component {
    render() {
        return (
            <div>
                <div class="container"><Header /></div>
                <div class="container"><App /></div>
                <div><Footer /></div>
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

registerServiceWorker();