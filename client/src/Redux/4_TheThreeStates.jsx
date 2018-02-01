// THIS IS JUST AN EXAMPLE
// Processses are aynchronous when they take a long time such as AJAX call
// They usually have 3 states: pending, success and error

// store.dispatch({type: 'LOAD_START'});
// fetch('/data.json')
// .then(data => 
// 	store.dispatch({type: 'LOAD_FINISH', data: data})
// )
// .catch(error => {
// 	store.disppatch({type: 'LOAD_ERROR', error: error})
// })

// !!!!!!!!!!!!! YOU CAN NOT DISPATCH INSIDE A REDUCER !!!!!!!!!!!!!!!!!!!!
var createStore = require('redux').createStore
var fetch = require('node-fetch');

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

var store = createStore(reducer, {})
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

load(store.dispatch);

// This doesn't work because Actions must be plain objects. Use custom middleware for async actions
// store.dispatch(load); 
// THAT'S WHY WE NEED REDUX THUNK