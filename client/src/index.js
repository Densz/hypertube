import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

class Index extends Component {
    render() {
        return (
            <App />
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

registerServiceWorker();

/*
** Do not delete, comments below!
*/

// function search() {
//     return fetch("/api/index", {
//         accept: "application/json"
//     })
//     .then(checkStatus)
//     .then(parseJSON)
// }

// function checkStatus(response) {
//     if (response.status >= 200 && response.status < 300) {
//         return response;
//     }
//     const error = new Error(`HTTP Error ${response.statusText}`);
//     error.status = response.statusText;
//     error.response = response;
//     console.log(error); // eslint-disable-line no-console
//     throw error;
// }

// function parseJSON(response) {
//   return response.json();
// }

// const Client = search()
// .then((Client) => {
//     console.log(Client);
// });
