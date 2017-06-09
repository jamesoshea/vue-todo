<template>
  <div>
    <h4>home</h4>
    <div class="entry">
      <input type="text" v-model="newTitle" placeholder="Add a new todo" autofocus="true" class="entry-boxes">
      <input type="text" v-model="newText" placeholder="Describe it" class="entry-boxes">
      <button @click="addTodo" class="entry-boxes">Add</button>
    </div>
    <div class="todo" v-for="(todo, i) in todos">
      <div class="row">
        <div class="eight columns">
          <h5 class="title">{{ todo.title }}</h5>
        </div>
        <div class="four columns del">
          <button @click="deleteTodo(i)">Delete</button>
          <button @click="completeTodo(i)">Completed</button>
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

.entry {
  margin-bottom: 3.5rem;
}

.entry-boxes {
  margin-bottom: 0rem;
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

.time-submitted {
  text-align: left;
}
</style>
