// React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
// Intl
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import localeData from './intl/data.json';

addLocaleData([...en, ...fr]);
const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

class Index extends Component {
    // Wrong way to do it but this is a test
    constructor(props) {
        super(props);
        this.state = {
            messages: localeData["en"],
        }
    }
    
    changeLangToFr = () => {
        this.setState({
            messages: localeData["fr"]
        })
    }
    
    changeLangToEn = () => {
        this.setState({
            messages: localeData["en"]
        })
    }

    render() {
        return (
            <div>
                <IntlProvider locale={language} messages={this.state.messages}>
                    <App changeLngToFr={ this.changeLangToFr } changeLngToEn={ this.changeLangToEn }/>
                </IntlProvider>
            </div>
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