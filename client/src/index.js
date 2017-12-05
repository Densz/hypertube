import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import localeData from './intl/data.json';
import './General/templates/css/index.css';

addLocaleData([...en, ...fr]);
const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

class Index extends Component {
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
			<IntlProvider locale={language} messages={this.state.messages}>
				<Routes changeLngToFr={this.changeLangToFr} changeLngToEn={this.changeLangToEn} />
			</IntlProvider>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

registerServiceWorker();