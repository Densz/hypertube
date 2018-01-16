import React, { Component } from 'react';
import { createStore } from 'redux';

const counter = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}

const store = createStore(counter)

// console.log(store.getState());
// store.dispatch({ type: 'DECREMENT' })
// console.log(store.getState());
// Function that is called everytime an action is dispatched
// store.subscribe(() => {
// 	document.body.innerHTML = store.getState();
// })

const Counter = ({value, onIncrement, onDecrement}) => (
	<div>
		<h1>{ value }</h1>
		<button onClick={onIncrement}>+</button>
		<button onClick={onDecrement}>-</button>
	</div>
)

//problem with rerendering
class Redux extends Component {
	render() {
		return (
			<div>
				Redux
				<Counter
					value={store.getState()}
					onIncrement={() => {
						store.dispatch({
							type: 'INCREMENT'
						})
						console.log(store.getState());
					}}
					onDecrement={() => {
						store.dispatch({
							type: 'DECREMENT'
						})
						console.log(store.getState());						
					}}
				/>
			</div>
		)
	}
}

export default Redux