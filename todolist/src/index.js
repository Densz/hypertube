// All container components need to access to the Redux store so they can subscribe to it.
// One option would be to pass it as a prop to every container component.
// The option is to use a special React Redux Component called Provider to magically
// make the store available to all container components in the application without passsing
// it explicitly.
// You only need to use it once when you render the root component

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

// Creation du store qui va donner acces aux differents states de l'application
let store = createStore(todoApp)
console.log(store.getState());

let unsubscribe = store.subscribe(() => console.log(store.getState()))

render(
  // Necessaire pour utiliser les sous fonctions
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)