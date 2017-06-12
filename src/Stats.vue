<template>
  <div>
    <h4 class="subtitle">stats</h4>
    <div class="container">
      <div class="col">
        <h1 class="total">{{ total }}</h1>
        <h5 class="todos">{{ todoString }}, active for a total of {{ totalTime }}</h5>
      </div>
      <div class="col">
        <h1 class="total">{{ compTotal }}</h1>
        <h5 class="todos">todos completed</h5>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    methods: {
    },
    computed: {
      total() {
        return this.$store.getters.total
      },
      totalTime() {
        return this.$store.getters.totalTime
      },
      todoString() {
        if (this.$store.getters.total == 1) {
          return 'todo'
        }
        return 'todos'
      },
      compTotal() {
        return this.$store.getters.completedTodos
      }
    }
  }
</script>

<style scoped>


.total {
  font-size: 150px;
  margin-bottom: 0px;
  margin-top: 0px;
  text-align: center;
}

.todos {
  text-align: center;
}

</style>
