<template>
  <div>
    <h4 v-if="todosArr.length > 0">Your todos:</h4>
    <div class="todo" v-for="(todo, i) in todos">
      <h5>{{ todo.title }}</h5>
      <p @click="showText(i)" class="summary">{{ todo.summary }} </p>
      <p>submitted at: {{ todo.time }}</p>
      <button @click="deleteTodo(i)">Delete this</button>
      <hr>
    </div>
    <input type="text" v-model="newTitle" placeholder="Add a new todo">
    <input type="text" v-model="newText" placeholder="Describe it">
    <button @click="addTodo">Add</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newTitle: '',
        newText: '',
        todosArr: []
      }
    },
    computed: {
      todos() {
        return this.$store.getters.allTodos
      }
    },
    methods: {
      addTodo() {
        this.$store.commit('add', {newTitle: this.newTitle, newText: this.newText})
        this.newTitle = this.newText = ''
      },
      deleteTodo(i) {
        this.$store.commit('delete', i)
      },
      showText(i) {
        this.$store.commit('showText', i)
      }
    }
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
