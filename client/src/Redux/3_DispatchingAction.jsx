var createStore = require('redux').createStore

function reducer (state, action) {
	switch (action.type) {
		case 'SET':
			return action.value
		case 'ADD':
			return state + action.value
		default:
			return state
	}
}

// => '0' in second argument is the initial state.
var store = createStore(reducer, 0)

console.log('initial state');
console.log(store.getState());

store.subscribe(() => {
	console.log(store.getState());
})

// => Actions are dispatched to the reducer
store.dispatch({ type: 'SET', value: 200});
store.dispatch({ type: 'ADD', value: 1});
