// Reducers, it's a simple function that takes in a state and return another state
// reducer(state, action) -> state

function reducer (state, action) {
	switch (action.type) {
		case 'PUBLISH':
			return { ...state, published: true }
		case 'UNPUBLISH':
			return { ...state, published: false }
		case 'UPDATE':
			return { ...state, ...action.data}
		default:
			return state
	}
}

// IMMUTABILITY
// It makes your app faster in the long run
// If your React app seems like it's not updating, it's probably because you're mutating state.
function reducer (state, action) { 
	switch (action.type) { 
		case 'PUBLISH': 
			state.published = true  // Avoid
		return state;
		_____________________________
		return { ...state, published: true }  // Good way to do it
}

var orig = { message: 'Hello' }
var copy = orig
orig.message = 'Hola'
console.log(orig === copy) // TRUE
console.log(copy) // Result { message: 'Hola' }