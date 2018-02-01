// Unlike combineReducers(), these sub-reducers will be able to work on the entire tree.
// reduce-reducers is a 3rd-party package. It's one of the many plugins available in the Redux ecosystem in npm.

let reduceReducers = require('reduce-reducers')

function profiles (state, action) {
	// see the whole state here.
}

function photos (state, action) {
	// here as well
}

let reducer = reduceReducers(profiles, photos)
let store = createStore(reducer)