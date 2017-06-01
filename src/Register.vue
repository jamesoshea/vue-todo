<template>
  <div>
    <input type="text" v-model="name" placeholder="name">
    <input type="text" v-model="email" placeholder="email">
    <input type="text" v-model="password" placeholder="password">
    <input type="text" v-model="password2" placeholder="confirm password">
    <button type="button" @click="submit">SUBMIT</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  import axios from 'axios'
  const self = this;
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password2: '',
        message: ''
      }
    },
    methods: {
      submit() {
        axios.post('/registerUser', {
          name: this.name,
          email: this.email,
          password: this.password,
          password2: this.password2,
          todos: this.$store.getters.allTodos,
          completed: this.$store.getters.completed
        })
          .then((res) => {
            this.message = 'lol'
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>

</style>
