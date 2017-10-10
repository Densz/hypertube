import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import localeData from './intl/data.json';

addLocaleData([...en, ...fr]);

const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
//const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const messages = localeData["en"];// || localeData[language] || localeData.en;

class Index extends Component {
    render() {
        return (
            <IntlProvider locale={language} messages={messages}>
                <App />
            </IntlProvider>
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