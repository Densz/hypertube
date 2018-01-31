import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { createStore } from 'redux';

const todo = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				id: action.id,
				text: action.text,
				completed: false
			}
		case 'TOGGLE_TODO':
			if (state.id !== action.id) {
				return state;
			}
			return {
				...state,
				completed: !state.completed
			}
		default:
			return state;
	}
}

const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				todo(undefined, action)
			];
		case 'TOGGLE_TODO':
			return state.map(t =>
				todo(t, action)
			);
		default:
			return state;
	}
}

const visibilityFilter = (
	state = 'SHOW_ALL', 
	action
) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;			
		default:
			return state;
	}
}

const todoApp = combineReducers({
	todos, 
	visibilityFilter
});

const store = createStore(todoApp);

let nextTodoId = 0;
class Todolist extends Component {
	componentDidMount() {
		this.unsubscribe = store.subscribe(() => 
			this.forceUpdate()
		)
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		return (
			<div>
				<h1>Todolist</h1>
				<input ref={ node => {
					this.input = node;
				}} />
				<button onClick={() => {
					store.dispatch({
						type: 'ADD_TODO',
						text: this.input.value,
						id: nextTodoId++
					})
					console.log(store.getState())
					this.input.value = '';
				}}>Add to do</button>
				<ul>
					{ store.getState().todos.map(todo =>
					<li key={todo.id}>
						{todo.text}
					</li>
					)}
				</ul>
			</div>
		)
	}
}

// => Store subscribe still not working

export default Todolist