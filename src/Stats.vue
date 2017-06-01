<template>
  <div>
    <div class="row">
      <div class="six columns">
        <h1 class="num-total">{{ total }}</h1>
        <h5 class="todos">{{ todoString }}, active for a total of {{ totalTime }}</h5>
      </div>
      <div class="six columns">
        <h1 class="comp-total">{{ compTotal }}</h1>
        <h5 class="todos">todos completed</h5>
      </div>
    </div>
    <hr>
    <div class="row">

    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    methods: {
      goHome() {
        this.$router.push('/')
      }
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
        return this.$store.state.completed
      }
    }
  }
</script>

<style scoped>

.row {
  width: 80%;
  margin: auto;
}

.num-total {
  font-size: 150px;
  margin-bottom: 0px;
}

.comp-total {
  font-size: 150px;
  margin-bottom: 0px;
}

.todos {
  text-align: center;
}

</style>
