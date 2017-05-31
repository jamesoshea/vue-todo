import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todos: []
    },
    getters: {
      allTodos(state) {
        return state.todos
      }
    },
    mutations: {
      add(state, todo) {
        let date = new Date()
        let hours = padZeros(date.getHours())
        let minutes = padZeros(date.getMinutes())
        let time = hours + ':' + minutes
        state.todos.push({ title: todo.newTitle, text: todo.newText, summary: todo.newText.slice(0, 50) + '...', time: time, expanded: false})
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
    },
    actions: {
      add(context, todo) {
        //async code goes here
        context.commit('register', todo)
      },
      deleteTodo(context, i) {
        //async here
        context.commit('deleteTodo', i)
      }
    }
});

function padZeros(inp){
  if (inp == 0) {
    return '00';
  }
  else if (inp < 10 && inp > 0) {
    return '0' + inp;
  }
  return String(inp);
}
