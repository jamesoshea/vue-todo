<template>
  <div>
    <h4 v-if="this.todos.length > 0">Your todos:</h4>
    <div class="todo" v-for="(todo, i) in todos">
      <h5>{{ todo.title }}</h5>
      <p @click="showText(i)" class="summary">{{ todo.summary }} </p>
      <p>submitted at: {{ todo.time }}</p>
      <button @click="deleteTodo(i)">Delete this</button>
      <hr>
    </div>
    <input type="text" v-model="newTitle" placeholder="Add a new todo">
    <input type="text" v-model="newText" placeholder="Describe it">
    <hr />
    <button @click="addTodo">Add</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newTitle: '',
        newText: '',
        todos: []
      }
    },
    methods: {
      addTodo() {
        let date = new Date()
        let hours = padZeros(date.getHours())
        let minutes = padZeros(date.getMinutes())
        let time = hours + ':' + minutes
        this.todos.push({ title: this.newTitle, text: this.newText, summary: this.newText.slice(0, 50) + '...', time: time, expanded: false})
        this.newTitle = this.newText = ''
      },
      deleteTodo(i) {
        this.todos.splice(i, 1);
      },
      showText(i) {
        if(!this.todos[i].expanded) {
          this.todos[i].summary = this.todos[i].text
          this.todos[i].expanded = !this.todos[i].expanded
        } else {
          this.todos[i].summary = this.todos[i].text.slice(0, 50) + '...'
          this.todos[i].expanded = !this.todos[i].expanded
        }
      }
    }
  }

  function padZeros(inp){
    if (inp == 0) {
      return '00'
    }
    else if (inp < 10 && > 0) {
      return '0' + inp;
    }
    return String(inp);
  }
</script>

<style scoped>
.todo {
  width: 80%;
  margin: auto;
}

.summary {
  color: #42b983;
  text-decoration: underline;
}
</style>
