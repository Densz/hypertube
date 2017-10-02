import React, { Component } from 'react';
//import Form from './components/Form/form.js';
import Header from './templates/header.js';
import Footer from './templates/footer.js';
import './index.css';

import Routes from './routes';

class App extends Component {
    render() {
        return (
            <div>
                <Routes />
                {/*<div class="container"><Header /></div>
                <div class="container"><Form /></div>
                <div><Footer /></div>*/}
            </div>
        );
    }
}

export default App;
