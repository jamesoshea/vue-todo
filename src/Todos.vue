<template>
  <div>
    <h4 class="subtitle">todos</h4>
    <div class="entry-boxes">
      <input type="text" v-model="newTitle" placeholder="Add a new todo" autofocus="true" class="entry-boxes"><br>
      <input type="text" v-model="newText" placeholder="Describe it" class="entry-boxes"><br>
      <button @click="addTodo" class="entry-boxes">Add</button>
    </div>
    <div class="spacer">
      &nbsp;
    </div>
    <div class="todo" v-for="(todo, i) in todos">
      <div class="container">
          <h5 class="col title">{{ todo.title }}</h5>
        <div class="col del">
          <button @click="completeTodo(i)">Completed</button>
          <button @click="deleteTodo(i)">Delete</button>
        </div>
      </div>
      <p @click="showText(i)" class="summary">{{ todo.summary }} </p>
      <p class="time-submitted">added {{ relTime(todo.date) }}</p>
      <hr>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

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
      },
      relTime(subTime) {
        return moment.utc(subTime).fromNow()
      },
      completeTodo(i) {
        this.$store.state.completed++
        this.deleteTodo(i)
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
  -webkit-align-self: flex-start;
  align-self: flex-start;
  margin-bottom: 1rem;
  margin-left: 0;
  font-size: 20px;
}

.del {
  margin-left: auto;
  margin-right: 0;
  text-align: right;
}

.summary {
  text-align: justify;
}

.time-submitted {
  text-align: left;
  font-size: 10px;
}
</style>
