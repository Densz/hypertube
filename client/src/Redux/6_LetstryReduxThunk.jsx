// NOW IT IS WORKING
// We dispatch a function instead of an action
// last line of the file is store.dispatch(load(...));
const thunk = require('redux-thunk').default
const createStore = require('redux').createStore
const applyMiddleware = require('redux').applyMiddleware
const fetch = require('node-fetch')

function reducer (state, action) {
	switch (action.type) {
	  case 'LOAD_START':
		return { status: 'loading' }
	  case 'LOAD_FINISH':
		return { status: 'finish', data: action.data }
	  case 'LOAD_ERROR':
		return { status: 'error', error: action.error.message }
	  default:
		return state
	}
}
  
store = createStore(reducer, {}, applyMiddleware(thunk))
store.subscribe(() => { console.log(store.getState()) })

function load(dispatch) {
	dispatch({type: 'LOAD_START'})
	fetch('https://httpbin.org/ip')
	.then(res => res.json())
    .then(data =>
      dispatch({ type: 'LOAD_FINISH', data: data }))
    .catch(error =>
      dispatch({ type: 'LOAD_ERROR', error: error }))
}

store.dispatch(load);