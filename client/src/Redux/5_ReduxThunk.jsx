// In the 4_TheThreeStates, we saw that we used load(...) to dipatch the actions
// But we can do better than that with Redux Thunk

// redux-thunk is a plugin for Redux. It makes dispatch() accept functions just like the one earlier
const thunk = require('redux-thunk')
const createStore = require('redux').createStore
const applyMiddleware = require('redux').applyMiddleware

// Redux-thunk is a Middleware or a plugin that extends dispatch to do more things
// Redux Thunk middleware allows you to write action creators that return a function instead of an action. 
// The thunk can be used to 
// 				!! delay !! 
// the dispatch of an action, or to dispatch only if a certain condition is met
//                       init state
store = createStore(reducer, {}, applyMiddleware(thunk))

// EXAMPLE BELOW of the possibility of Redux-Thunk
// const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
 
// function increment() {
//   return {
//     type: INCREMENT_COUNTER
//   };
// }
 
// function incrementAsync() {
//   return dispatch => {
//     setTimeout(() => {
//       // Yay! Can invoke sync or async actions with `dispatch` 
//       dispatch(increment());
//     }, 1000);
//   };
// }

// A thunk is a function that wraps an expression to delay its evaluation.

// calculation of 1 + 2 is immediate 
// x === 3 
// let x = 1 + 2;
 
// calculation of 1 + 2 is delayed 
// foo can be called later to perform the calculation 
// foo is a thunk! 
// let foo = () => 1 + 2;

// AFTER THAT I THINK WE CAN WRITE FUNCTION LIKE THIS
function load (dispatch, getState) {
	// ...
}

//We can take the load() function earlier and use it as an action.
store.dispatch(load);