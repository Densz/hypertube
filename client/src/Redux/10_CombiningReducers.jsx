// Let's say you app has articles and users. 
// If we put everything into one reducer, we'll be writing a very long function! 
// There's a better way. Imagine your store state looks like this:
// let initialState = {
// 	articles: {
// 		id: 1,
// 		title: "This is 1st title",
// 		published: false
// 	},
// 	users: {
// 		id: 2,
// 		login: "Densz"
// 	}
// }

const combineReducers = require('redux').combineReducers
const createStore = require('redux').createStore

function articles(state, action) {
	return {
		id: 2,
		private: false
	}
}

function users(state, action) {
	return {
		id: 2,
		login: "Densz",
		published: false
	}
}

let reducer = combineReducers({articles, users})

console.log(reducer());

let store = createStore(reducer)

// combineReducers() lets you break apart your reducer. Your reducers will only operate in their own subtree, like state.profile above.
function profile (state, action) {
	if (action.type === 'PUBLISH') {
	  // state is limited to state.profile here.
	  return { ...state, private: false }
	}
}
let reducer = combineReducers({ profile,  })
// This reducer can't see state.photos! This is usually a good thing. As your store reducers get bigger, you're assured that they only play in one part of your state tree.
  