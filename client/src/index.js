import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import callApi from './ApiCaller/apiCaller';

class Index extends Component {
	componentDidMount() {
		let ok = callApi('/api/index', 'post')
		.then((ok) => {
			console.log(ok);
		})
	}

    render() {
        return (
			<App />
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

registerServiceWorker();