var createStore = require('redux').createStore;

let initialState = {
	title: '1st article',
	published: false
}

var store = createStore(reducer, initialState);

function reducer (state, action) {
	if (action.type === 'PUBLISH') {
		return { ...state, published: !state.published}
	} else {
		return state
	}
}

// => Listen for changes in the store using subscribe()
store.subscribe(() => {
	console.log('Log in store subscribe')
	console.log(store.getState());
})

// => Dispatching action and listening to them with console.log
console.log('before:')
console.log(store.getState());
store.dispatch({type: 'PUBLISH'})
// console.log('after:')
// console.log(store.getState());
