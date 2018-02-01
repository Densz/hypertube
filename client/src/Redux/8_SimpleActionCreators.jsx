export function publishProject(id) {
	return { type: 'PROJECT_UPDATE', id, published: true }
}

// Action creators are functions that return things that you can pass to dispatch().

// redux-thunk is a plugin that will allow you to pass functions to dispatch(). Great for asynchronous actions.