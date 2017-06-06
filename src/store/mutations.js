import moment from 'moment'
import axios from 'axios'

export default {
  add(state, todo) {
    let now = new Date()
    let formattedTodo = { title: todo.newTitle, text: todo.newText, summary: todo.newText.slice(0, 50) + '...', date: moment.utc(new Date)}
    state.todos.push(formattedTodo)
    if (state.userId) {
      axios.post('/addTodo', {todos: state.todos, user: state.userId, token: localStorage.getItem('token')})
        .then((res) => {
          state.message = res.data.message
        })
        .catch((err) =>{
          state.message = err.response.data.message
        })
    }
  },
  showText(state, i) {
    if(!state.todos[i].expanded) {
      state.todos[i].summary = state.todos[i].text
      state.todos[i].expanded = !state.todos[i].expanded
    } else {
      state.todos[i].summary = state.todos[i].text.slice(0, 50) + '...'
      state.todos[i].expanded = !state.todos[i].expanded
    }
  },
  deleteTodo(state, i) {
    state.todos.splice(i, 1)
  },
  setUser(state, user) {
    if(user) {
      state.userId = user.id,
      state.todos = user.todos,
      state.completed = user.completed
    } else {
      state.userId = undefined
    }
  },
  logout(state) {
    localStorage.removeItem('token')
    state.userId = undefined
    state.todos = []
    state.completed = 0
    state.message = ''

  },
  setMessage(state, message) {
    state.message = message
  }
}
