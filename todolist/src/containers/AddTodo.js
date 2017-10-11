// Sometimes it is hard to tell if is a presentational or a container.
// AddTodo is an input field with an "Add" button
// Technically we could split it into two components but it might be too early at this stage. 
// It's fine to mix presentation and logic in a component that is very small. As it grows, it will be more obvious how to split it, so we'll leave it mixed.

import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

// Need to include connect before
// AddTodo from Actions (Actions/index.js)
let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo