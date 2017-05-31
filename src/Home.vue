<template>
  <div>
    <h4 v-if="todosArr.length > 0">Your todos:</h4>
    <div class="todo" v-for="(todo, i) in todos">
      <div class="row">
        <div class="eight columns">
          <h5 class="title">{{ todo.title }}</h5>
        </div>
        <div class="four columns del">
          <button @click="deleteTodo(i)">Delete</button>
        </div>
      </div>
      <p @click="showText(i)" class="summary">{{ todo.summary }} </p>
      <p>submitted at: {{ todo.time }}</p>
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
        this.$store.commit('deleteTodo', i)
      },
      showText(i) {
        this.$store.commit('showText', i)
      }
    }
  }
</script>

<style scoped>

p {
  margin-bottom: 1rem;
}

.todo {
  width: 80%;
  margin: auto;
}

.title {
  text-align: left;
  margin-bottom: 1rem;
}

.del {
  text-align: right;
}

.summary {
  color: #42b983;
  text-decoration: underline;
  text-align: justify;
}
</style>
