var createStore = require('redux').createStore

var initialState = {
	title: 'Kind of Blue',
	artist: 'Miles Davis',
	year: 1959
}
  
var reducer = (state,  action) => {
	return state;
}

var store = createStore(reducer, initialState)

var state = store.getState()
console.log(state);
