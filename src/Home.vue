<template>
  <div>
    <h1>Here are some things to do:</h1>
    <div v-for="(todo, i) in todos">
      <h3>{{ todo.title }}</h3>
      <p>{{ todo.text }} <br>
      submitted at: {{ todo.time }}</p>
      <button @click="deleteTodo(i)">Delete this</button>
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
        this.todos.push({ title: this.newTitle, text: this.newText, time: time})
        this.newTitle = this.newText = ''
      },
      deleteTodo(i) {
        this.todos.splice(i, 1);
      }
    }
  }

  function padZeros(inp){
    if (inp < 10) {
      return Number('0' + inp);
    }
    return Number(inp);
  }
</script>

<style scoped>

</style>
