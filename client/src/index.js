// React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import hypertubeApp from './redux/reducers';
// Intl
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import localeData from './intl/data.json';

let store = createStore(hypertubeApp);

addLocaleData([...en, ...fr]);

//const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
//const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
//let messages = localeData["en"];// || localeData[language] || localeData.en;

class Index extends Component {
    // Wrong way to do it but this is a test
    constructor(props) {
        super(props);
        this.state = {
            messages: localeData["en"],
            language: (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage
        }
    }

    render() {
        return (
            <Provider store={store}>
                <IntlProvider locale={this.state.language} messages={this.state.messages}>
                    <App />
                </IntlProvider>
            </Provider>
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