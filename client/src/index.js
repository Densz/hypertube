import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import localeData from './intl/data.json';
import './General/templates/css/index.css';

// Redux
// for the moment we are not using combine reducers
import reducers from './reducers/showOAuth';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
let store = createStore(reducers, { toggle: "c'est la valeur initial" });

addLocaleData([...en, ...fr]);
const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: localeData["en"],
		}
	}
	
	// Not necessary
	// componentDidMount(){
	// 	this.unsubscribe = store.subscribe(() => 
	// 		this.forceUpdate()
	// 	)
	// }

	// componentWillUnmount() {
	// 	this.unsubscribe();
	// }

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
			<Provider store={store}>
				<IntlProvider locale={language} messages={this.state.messages}>
					<Routes changeLngToFr={this.changeLangToFr} changeLngToEn={this.changeLangToEn} />
				</IntlProvider>
			</Provider>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

registerServiceWorker();