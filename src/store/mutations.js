import moment from 'moment'

export default {
  add(state, todo) {
    let now = new Date()
    state.todos.push({ title: todo.newTitle, text: todo.newText, summary: todo.newText.slice(0, 50) + '...', date: moment.utc(new Date)})
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
    state.todos.splice(i, 1);
  }
}
