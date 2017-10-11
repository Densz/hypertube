// VisibleTodoList filters the todos according to the current visibility filter and renders a TodoList
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
// Car on va appliquer les changements ci dessous
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}
// To use connect(), you need to define a special function called mapStateToProps
// that tells how to transform the current Redux store state into the props you want to pass to a presentational component
// VisibleTodoList needs to calculate todos to pass to the todoList, so we define a function that filters
// the state.todos according to the state.visibilityFilter, and use it in its mapStateToProps
const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

// In addition to reading the state, container components can dispatch actions.
// In a similar fashion, you can define a function called mapDispatchToProps() 
// that receives the Dispatch() method and returns callback props that you want to inject into 
// the presentational component. For example we want the VisibleTodoList to inject a prop called
// onTodoClick into the TodoList component, and we want onTodoClick to dispatch a TOGGLE_TODO action.
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

// Finally, we create the VisibleTodoList by calling connect() and passing these two functions.
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList